import { exec } from 'child_process'
import { getPrismaClientSync } from 'db'
import { getDataBaseUrlSync, getSecretValue, updateSecret } from 'db/utils'
import { getServerSession } from 'next-auth/next'
import { config } from 'auth'
import { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'

const STRIPE_SECRET_KEY_TEST = process.env.STRIPE_SECRET_KEY_TEST || ''
const stripe = new Stripe(STRIPE_SECRET_KEY_TEST, {
  apiVersion: '2022-11-15',
})

function runMigration() {
  return new Promise(function (resolve, reject) {
    var ch = exec(
      `yarn run prisma migrate deploy`,
      function (error, stdout, stderr) {
        if (stderr) {
          console.log('stderr', stderr)
          reject(stderr)
        }
        if (error) {
          console.log('error', error)
          reject(error)
        } else {
          console.log('migration running before', stdout)
          resolve(stdout)
        }
      }
    )
  })
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, config)

  if (!session) {
    return res.status(401).end()
  }
  const body = JSON.parse(req.body)
  const DATBASE_NAME = body.accountNumber

  const dataBaseSecret =
    process.env.MODE === 'development'
      ? await getSecretValue('local_database_cred')
      : await getSecretValue('database_cred')

  const {
    DATABASE_USER_NAME,
    DATABASE_PASSWORD,
    DATABASE_HOST,
    DATABASE_PORT,
  } = dataBaseSecret

  if (req.method === 'POST') {
    const prismaLeadTailor = getPrismaClientSync(
      DATABASE_USER_NAME,
      DATABASE_PASSWORD,
      DATABASE_HOST,
      DATABASE_PORT,
      'leadtailor'
    )

    try {
      const secrets =
        process.env.MODE === 'development'
          ? await getSecretValue('local_users')
          : await getSecretValue('users')

      if (secrets.hasOwnProperty(body.email)) {
        return res.status(409).json({ error: 'User is already exists' })
      }

      process.env.DATABASE_URL = getDataBaseUrlSync(
        DATABASE_USER_NAME,
        DATABASE_PASSWORD,
        DATABASE_HOST,
        DATABASE_PORT,
        DATBASE_NAME
      )
      const isMigrationDone = await runMigration()
      const prisma = getPrismaClientSync(
        DATABASE_USER_NAME,
        DATABASE_PASSWORD,
        DATABASE_HOST,
        DATABASE_PORT,
        DATBASE_NAME
      )

      const customer = await stripe.customers.create({
        name: body.planType, //optional
        description: 'testing customers for corporate plan', //optional
        email: body.email,
        metadata: {
          //billing contact
          firstName: body.billing.firstName,
          lastName: body.billing.lastName,
          jobTitle: body.billing.jobTitle,
          email: body.billing.email,
          countryCode: body.billing.countryCode,
          mobilePhone: body.billing.mobilePhone,
          address: body.billing.address1,
          appartment: body.billing.appartmentEtc,
          country: body.billing.country,
          state: body.billing.state,
          city: body.billing.city,
          postal: body.billing.zipCode,
          userType: 'CUSTOMER_ADMIN',
        },
      })

      if (!customer) {
        return res.status(500).json({ error: 'Failed to create the customer' })
      }

      const product = await stripe.products.create({
        name: body.planType,
        description: 'testing product', //optional
        metadata: {
          createdAt: new Date().toDateString(),
          subscriptionModel: body.subscriptionModel,
          renewalPreriod: parseInt(body.renewalPeriod),
          goLiveDate: body.goLiveDate,
          ratePerVideo: body.ratePerVideo,
          includedVideos: parseInt(body.videoCreditsIncluded),
          creditFrequency: body.videoCreditsFrequency,
          paymentMethod: body.paymentMethods,
          paymentTerm: body.paymentTerms,
          dueDate: body.paymentDueDate,
        },
      })

      if (!product) {
        return res.status(500).json({ error: 'Failed to create the product' })
      }

      const response = await prisma.user.create({
        data: {
          //admin info
          id: customer.id,
          firstName: body.firstName,
          lastName: body.lastName,
          email: body.email,
          accountNumber: body.accountNumber,
          userType: 'CUSTOMER_ADMIN',
          phoneNumber: body.countryCode + body.mobilePhone,
          jobTitle: body.jobTitle,
          //company info
          company: {
            create: {
              name: body.companyName,
              website: body.companyWebsite,
            },
          },
          //plan details
          billingHistory: {
            create: {
              planId: product.id,
              status: 'PENDING',
            },
          },
        },
      })

      await updateSecret(
        process.env.MODE === 'development' ? 'local_users' : 'users',
        {
          [body.email]: body.accountNumber,
        }
      )

      if (!response) {
        return res.status(500).json({ error: 'Failed to create the user' })
      }

      await prisma.$disconnect()
      const data = await prismaLeadTailor.lead.findFirst({
        where: {
          email: {
            equals: response.email ?? '',
          },
        },
      })

      const updateLead = await prismaLeadTailor.lead.update({
        where: {
          id: data?.id,
        },
        data: {
          accountCreated: true,
          companyName: body.companyName,
          companyWebsite: body.companyWebsite,
        },
      })

      if (!updateLead) {
        return res
          .status(500)
          .json({ error: 'Failed to update the lead table' })
      }
      res.status(201).json({ data: response })
    } catch (error) {
      res.status(500).json({ error: 'Failed to register the user' })
    } finally {
      await prismaLeadTailor.$disconnect()
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
