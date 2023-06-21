import type { NextApiRequest, NextApiResponse } from 'next'
import { axios, stringifyParams } from 'lib'
import { getPrismaClientAsync } from 'db'

axios.defaults.headers.common['Content-Type'] =
  'application/x-www-form-urlencoded'

export default async function handler(req: any, res: NextApiResponse) {

  // const instance_url = req.body.instance_url;
  // const access_token = req.body.access_token;
  const instance_url = process.env.INSTANCE_URL
  const access_token = req.query.accessToken;
  // const access_token =
    // '00D5i00000CaPco!AQsAQPHbg0NF7Sz2zJ.wtR4qGRwfmjaQOo3oR2OkjOfcipKbVGyySLUDROCMmBRMZpBt5mpg5dXhGwYh3yxsU3MjuKKkFgv7'
  if (req.method === 'GET') {
    try {
      if (
        req.query.FirstName ||
        req.query.Industry ||
        req.query.Title ||
        // req.query.AccountName ||
        req.query.Website ||
        req.query.LeadSource ||
        req.query.Email ||
        req.query.Country ||
        req.query.Phone ||
        req.query.LeadOwner ||
        req.query.LastName
      ) {
        // SELECT+Owner.name,+FIELDS(ALL)+FROM+Lead+LIMIT+200
        let query = 'SELECT+Owner.name,+FIELDS(ALL)+FROM+Lead+WHERE+('
        if (req.query.FirstName) {
          const arr = req.query.FirstName?.split(',')
          for (let item of arr) {
            query += `FirstName+LIKE+'%25${item.trim()}%25'+OR+`
          }
          query = query.slice(0, query.length - 4)
          query = query + ')+AND+('
        }
        if (req.query.Industry) {
          const arr = req.query.Industry?.split(',')
          for (let item of arr) {
            query += `Industry+LIKE+'%25${item.trim()}%25'+OR+`
          }
          query = query.slice(0, query.length - 4)
          query = query + ')+AND+('
        }
        if (req.query.Title) {
          const arr = req.query.Title?.split(',')
          for (let item of arr) {
            query += `Title+LIKE+'%25${item.trim()}%25'+OR+`
          }
          query = query.slice(0, query.length - 4)
          query = query + ')+AND+('
        }
        // if (req.query.AccountName) {
        //   const arr = req.query.AccountName?.split(',')
        //   for (let item of arr) {
        //     query += `AccountName+LIKE+'%25${item.trim()}%25'+OR+`
        //   }
        //   query = query.slice(0, query.length - 4)
        //   query = query + ')+AND+('
        // }
        if (req.query.LeadOwner) {
          const arr = req.query.LeadOwner?.split(',')
          for (let item of arr) {
            query += `Owner.name+LIKE+'%25${item.trim()}%25'+OR+`
          }
          query = query.slice(0, query.length - 4)
          query = query + ')+AND+('
        }
        if (req.query.LastName) {
          const arr = req.query.LastName?.split(',')
          for (let item of arr) {
            query += `LastName+LIKE+'%25${item.trim()}%25'+OR+`
          }
          query = query.slice(0, query.length - 4)
          query = query + ')+AND+('
        }
        if (req.query.Website) {
          const arr = req.query.Website?.split(',')
          for (let item of arr) {
            query += `Website+LIKE+'%25${item.trim()}%25'+OR+`
          }
          query = query.slice(0, query.length - 4)
          query = query + ')+AND+('
        }
        if (req.query.LeadSource) {
          const arr = req.query.LeadSource?.split(',')
          for (let item of arr) {
            query += `LeadSource+LIKE+'%25${item.trim()}%25'+OR+`
          }
          query = query.slice(0, query.length - 4)
          query = query + ')+AND+('
        }
        if (req.query.Country) {
          const arr = req.query.Country?.split(',')
          for (let item of arr) {
            query += `Country+LIKE+'%25${item.trim()}%25'+OR+`
          }
          query = query.slice(0, query.length - 4)
          query = query + ')+AND+('
        }
        if (req.query.Email) {
          const arr = req.query.Email?.split(',')
          for (let item of arr) {
            query += `Email+LIKE+'%25${item.trim()}%25'+OR+`
          }
          query = query.slice(0, query.length - 4)
          query = query + ')+AND+('
        }
        if (req.query.Phone) {
          const arr = req.query.Phone?.split(',')
          for (let item of arr) {
            query += `Phone+LIKE+'%25${item.trim()}%25'+OR+`
          }
          query = query.slice(0, query.length - 4)
          query = query + ')+AND+('
        }

        let queryString = query.slice(0, query.length - 6)
        queryString = `query?q=` + queryString + `LIMIT+200`
        // console.log(queryString)

        axios.defaults.headers.common['Authorization'] =
          'Bearer ' + access_token
        const salesforceLeads = await axios.get(
          `${instance_url}/services/data/v57.0/${queryString}`
        )
        res.send(salesforceLeads.data.records)

      } else if (req.query.GlobalSearch) {
        // console.log('req.query', req.query, "req.method",req.method)
        let query = 'SELECT+Owner.name,+FIELDS(ALL)+FROM+Lead+WHERE+'

        let generalSearch = req.query.GlobalSearch
        let arr = generalSearch.split(',')

        for (let item of arr) {
          query += `FirstName+LIKE+'%25${item.trim()}%25'+OR+`
        }
        for (let item of arr) {
          query += `Industry+LIKE+'%25${item.trim()}%25'+OR+`
        }
        for (let item of arr) {
          query += `Title+LIKE+'%25${item.trim()}%25'+OR+`
        }
        // for (let item of arr) {
        //   query += `AccountName+LIKE+'%25${item.trim()}%25'+OR+`
        // }
        for (let item of arr) {
          query += `Owner.name+LIKE+'%25${item.trim()}%25'+OR+`
        }
        for (let item of arr) {
          query += `LastName+LIKE+'%25${item.trim()}%25'+OR+`
        }
        for (let item of arr) {
          query += `Website+LIKE+'%25${item.trim()}%25'+OR+`
        }
        for (let item of arr) {
          query += `LeadSource+LIKE+'%25${item.trim()}%25'+OR+`
        }
        for (let item of arr) {
          query += `Country+LIKE+'%25${item.trim()}%25'+OR+`
        }
        for (let item of arr) {
          query += `Email+LIKE+'%25${item.trim()}%25'+OR+`
        }
        for (let item of arr) {
          query += `Phone+LIKE+'%25${item.trim()}%25'+OR+`
        }
        let queryString = query.slice(0,query.length-4)
        queryString =  `query?q=` + queryString + `+LIMIT+200`
        // console.log("queryString",queryString)

        axios.defaults.headers.common['Authorization'] =
          'Bearer ' + access_token
        const salesforceLeads = await axios.get(
          `${instance_url}/services/data/v57.0/${queryString}`
        )
        res.send(salesforceLeads.data.records)
      } else {
        axios.defaults.headers.common['Authorization'] =
          'Bearer ' + access_token
        const salesforceLeads = await axios.get(
          `${instance_url}/services/data/v57.0/query?q=SELECT+Owner.name,+FIELDS(ALL)+FROM+Lead+Limit+200`
        )
        res.send(salesforceLeads.data.records)
      }
    } catch (error) {
      console.log(error)
      res.send({ error: error })
    }
  } else if (req.method === 'POST') {
    try {
      const data = req.body.map((lead: any) => {
        return {
          id: lead.Id,
          createdBy: '1', //refrence of user id
          campaignId: '1', //refrence of campaign id
          firstName: lead.FirstName,
          lastName: lead.LastName,
          email: lead.Email,
          phoneNumber: lead.Phone,
          LeadSource: lead.LeadSource,
          website: lead.Website,
          industry: lead.Industry,
          jobTitle: lead.Title,
          country: lead.Country,
          numberOfVideoDelivered: 0,
          numberOfEmailDelivered: 0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
      })
      const Database_Name: any = process.env.DATBASE_NAME
      const prisma: any = await getPrismaClientAsync(Database_Name)

      // const leads = await prisma.contacts.createMany({
      //   data: data,
      // });
      // res.send(leads)

      const leads: any[] = []
      data.forEach(async (lead: any) => {
        // console.log('lead+++++++++++++++++++lead', lead)
        const createdLead = await prisma.contacts.createMany({
          data: lead,
        })
        leads.push(createdLead)
      })
      res.send(leads)

      // const contacts = await prisma.contacts.findMany({
      //   where: {
      //     createdBy: '1',
      //   },
      // })
      // res.json({ contacts })
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  } else {
    res.send({ error: 'request not permited' })
  }
}
