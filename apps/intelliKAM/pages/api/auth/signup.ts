import { getPrismaClientSync } from 'db'
import type { NextApiRequest, NextApiResponse } from 'next'
import { exec, execSync } from 'child_process'
import {
  getAllSchema,
  getDataBaseUrlSync,
  getSecretValue,
  updateSecret,
} from 'db/utils'

import Stripe from 'stripe'
import { sendEmail } from '../helper/sendemail'

const STRIPE_SECRET_KEY_TEST = process.env.STRIPE_SECRET_KEY_TEST || ''

const stripe = new Stripe(STRIPE_SECRET_KEY_TEST, {
  apiVersion: '2022-11-15',
})

function runMigration() {
  return new Promise(function (resolve, reject) {
    var ch = exec(
      `yarn run prisma migrate deploy`,
      function (error, stdout, stderr) {
        if (error) {
          console.log('Error in running migration', stderr)
          reject(error)
        } else {
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
  const body = JSON.parse(req.body)
  const DATBASE_NAME = body.accountNumber

  if (req.method === 'POST') {
    try {
      // get DataBase credentials
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

      // check user is exist or not
      const secrets =
        process.env.MODE === 'development'
          ? await getSecretValue('local_users')
          : await getSecretValue('users')

      console.log('process.env.MODE', process.env.MODE)

      if (secrets.hasOwnProperty(body.email)) {
        return res.status(409).json({ error: 'User is already exists' })
      }
      console.log(secrets)

      if (body.selectedPlan === 'Starter') {
        process.env.DATABASE_URL = getDataBaseUrlSync(
          DATABASE_USER_NAME,
          DATABASE_PASSWORD,
          DATABASE_HOST,
          DATABASE_PORT,
          DATBASE_NAME
        )

        const output: any = execSync('yarn run prisma -v', {
          encoding: 'utf-8',
        })

        console.log('output===', output)

        console.log('DATABASE_URL===', process.env.DATABASE_URL)

        const isMigrationDone = await runMigration()

        console.log('isMigrationDone===', isMigrationDone)
        const prisma = getPrismaClientSync(
          DATABASE_USER_NAME,
          DATABASE_PASSWORD,
          DATABASE_HOST,
          DATABASE_PORT,
          DATBASE_NAME
        )
        return res.status(200).json({ data: 'Success' })
        // if (isMigrationDone) {
        //   const prisma = getPrismaClientSync(
        //     DATABASE_USER_NAME,
        //     DATABASE_PASSWORD,
        //     DATABASE_HOST,
        //     DATABASE_PORT,
        //     DATBASE_NAME
        //   )

        //   // create customer
        //   const customer = await stripe.customers.create({
        //     name: body.selectedPlan, //optional
        //     description: 'testing customers for starter plan', //optional
        //     email: body.email,
        //     metadata: {
        //       firstName: body.firstName,
        //       lastName: body.lastName,
        //       email: body.email,
        //       phoneNumber: body.countryCode + body.phoneNumber,
        //       userType: 'CUSTOMER_STANDARD',
        //     },
        //   })
        //   if (!customer) {
        //     return res
        //       .status(500)
        //       .json({ error: 'Failed to create the customer' })
        //   }

        //   // create product
        //   const product = await stripe.products.create({
        //     name: body.selectedPlan, //optional
        //     description: 'testing products for starter plan', //optional
        //     metadata: {
        //       firstName: body.firstName,
        //       lastName: body.lastName,
        //       email: body.email,
        //       phoneNumber: body.countryCode + body.phoneNumber,
        //       userType: 'CUSTOMER_STANDARD',
        //       ratePerVideo: 7.5,
        //       includedVideos: 2,
        //       createdAt: new Date().toDateString(),
        //     },
        //   })

        //   if (!product) {
        //     return res
        //       .status(500)
        //       .json({ error: 'Failed to create the product' })
        //   }

        //   const response = await prisma.user.create({
        //     data: {
        //       id: customer.id,
        //       firstName: body.firstName,
        //       lastName: body.lastName,
        //       email: body.email,
        //       accountNumber: body.accountNumber,
        //       userType: 'CUSTOMER_STANDARD',

        //       billingHistory: {
        //         create: {
        //           planId: product.id,
        //           status: 'PENDING',
        //         },
        //       },
        //     },
        //   })
        //   await updateSecret(
        //     process.env.MODE === 'development' ? 'local_users' : 'users',
        //     {
        //       [body.email]: body.accountNumber,
        //     }
        //   )
        //   await prisma.$disconnect()
        //   return res.status(201).json({ data: response })
        // }
      } else {
        const prismaLeadTailor = getPrismaClientSync(
          DATABASE_USER_NAME,
          DATABASE_PASSWORD,
          DATABASE_HOST,
          DATABASE_PORT,
          'leadtailor'
        )
        const emailExists = await prismaLeadTailor.lead.findFirst({
          where: { email: body.email },
        })
        if (emailExists === null) {
          const response = await prismaLeadTailor.lead.create({
            data: {
              firstName: body.firstName,
              lastName: body.lastName,
              email: body.email,
              phoneNumber: body.countryCode + body.phoneNumber,
              userType: 'CUSTOMER_ADMIN',
            },
          })
          const subject = 'New user is registered on leadtailor'
          const adminEmailTemplate = `
                                  <div>
                                    <p>Dear Admin</p>
                                    <p>New User is successfully registered!</p>
                                    <p><strong>User Details: </strong></p>
                                    <p>Email : ${body.email}</p>
                                  </div>`
          // send email LT staff
          await sendEmail(
            'ambaliya.jevin@gmail.com',
            subject,
            adminEmailTemplate
          )

          const userEmailTemplate = `
                                  <div>
                                    <p>Dear ${body.firstName} ${body.lastName},</p>
                                    <p>Your request for the Corporate plan has been sent successfully. One of your Leadtailer experts will contact you
                                    within 48 hours.</p>
                                  </div>`
          // send email to user
          await sendEmail(body.email, 'Registration request', userEmailTemplate)
          await prismaLeadTailor.$disconnect()
          return res.json({ data: response })
        } else {
          await prismaLeadTailor.$disconnect()
          return res.status(409).json({
            error:
              'Your registration request has been received already. Please wait for leadtailor staff to review it.',
          })
        }
      }
    } catch (error) {
      console.log('error in catch', error)
      res.status(500).json({ error: 'Something went wrong' })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
