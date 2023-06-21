import type { NextApiRequest, NextApiResponse } from 'next'
import { axios, stringifyParams } from 'lib'
import { getPrismaClientAsync } from 'db'

axios.defaults.headers.common['Content-Type'] =
  'application/x-www-form-urlencoded'

export default async function handler(req: any, res: NextApiResponse) {
  // const instance_url = req.body.instance_url;
  // const access_token = req.body.access_token;
  // const instance_url = process.env.INSTANCE_URL
    const access_token = req.query.accessToken;
    const instance_url = req.query.instance_url;
  // const access_token ='00D5i00000CaPco!AQsAQD.YX4Fgap8vjcGc1JZR89Mu8uMgIKymESS9Ql9wBbAxgPnYBoy4a3MKIlJz02eyyjMAwGL1HxhTX_HrGXv5TP7fAxOG';
  
  if (req.method === 'GET') {
    console.log("+++++++++++++++++++**************++++++++++",access_token, instance_url);
    try {
      if (
        req.query.FirstName ||
        // req.query.Industry ||
        req.query.Title ||
        // req.query.Website ||
        req.query.LeadSource ||
        req.query.Email ||
        req.query.MailingCountry ||
        req.query.Phone ||
        req.query.LeadOwner ||
        req.query.LastName
      ) {
        let query = 'SELECT+Owner.name,+FIELDS(ALL)+FROM+contact+WHERE+('
        if (req.query.FirstName) {
          const arr = req.query.FirstName?.split(',')
          for (let item of arr) {
            query += `FirstName+LIKE+'%25${item.trim()}%25'+OR+`
          }
          query = query.slice(0, query.length - 4)
          query = query + ')+AND+('
        }
        // if (req.query.Industry) {
        //   const arr = req.query.Industry?.split(',')
        //   for (let item of arr) {
        //     query += `Industry+LIKE+'%25${item.trim()}%25'+OR+`
        //   }
        //   query = query.slice(0, query.length - 4)
        //   query = query + ')+AND+('
        // }
        if (req.query.Title) {
          const arr = req.query.Title?.split(',')
          for (let item of arr) {
            query += `Title+LIKE+'%25${item.trim()}%25'+OR+`
          }
          query = query.slice(0, query.length - 4)
          query = query + ')+AND+('
        }
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
        // if (req.query.Website) {
        //   const arr = req.query.Website?.split(',')
        //   for (let item of arr) {
        //     query += `Website+LIKE+'%25${item.trim()}%25'+OR+`
        //   }
        //   query = query.slice(0, query.length - 4)
        //   query = query + ')+AND+('
        // }
        if (req.query.LeadSource) {
          const arr = req.query.LeadSource?.split(',')
          for (let item of arr) {
            query += `LeadSource+LIKE+'%25${item.trim()}%25'+OR+`
          }
          query = query.slice(0, query.length - 4)
          query = query + ')+AND+('
        }
        if (req.query.MailingCountry) {
          const arr = req.query.MailingCountry?.split(',')
          for (let item of arr) {
            query += `MailingCountry+LIKE+'%25${item.trim()}%25'+OR+`
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
        // console.log(salesforceLeads.data.records);
        
        res.send(salesforceLeads.data.records)
      } else if (req.query.GlobalSearch) {
        console.log("++++++++++++++++===================*++++++++++",access_token, instance_url);
        let query = 'SELECT+Owner.name,+FIELDS(ALL)+FROM+contact+WHERE+'

        let generalSearch = req.query.GlobalSearch
        let arr = generalSearch.split(',')

        for (let item of arr) {
          query += `FirstName+LIKE+'%25${item.trim()}%25'+OR+`
        }
        // for (let item of arr) {
        //   query += `Industry+LIKE+'%25${item.trim()}%25'+OR+`
        // }
        for (let item of arr) {
          query += `Title+LIKE+'%25${item.trim()}%25'+OR+`
        }
        for (let item of arr) {
          query += `Owner.name+LIKE+'%25${item.trim()}%25'+OR+`
        }
        for (let item of arr) {
          query += `LastName+LIKE+'%25${item.trim()}%25'+OR+`
        }
        // for (let item of arr) {
        //   query += `Website+LIKE+'%25${item.trim()}%25'+OR+`
        // }
        for (let item of arr) {
          query += `LeadSource+LIKE+'%25${item.trim()}%25'+OR+`
        }
        for (let item of arr) {
          query += `MailingCountry+LIKE+'%25${item.trim()}%25'+OR+`
        }
        for (let item of arr) {
          query += `Email+LIKE+'%25${item.trim()}%25'+OR+`
        }
        for (let item of arr) {
          query += `Phone+LIKE+'%25${item.trim()}%25'+OR+`
        }
        let queryString = query.slice(0, query.length - 4)
        queryString = `query?q=` + queryString + `+LIMIT+200`
        // console.log('queryString', queryString)

        axios.defaults.headers.common['Authorization'] =
          'Bearer ' + access_token
        const salesforceLeads = await axios.get(
          `${instance_url}/services/data/v57.0/${queryString}`
        )

        res.send(salesforceLeads.data.records)
      } else {

    console.log("++++++++++++++++++++++++++++",access_token, instance_url);
        axios.defaults.headers.common['Authorization'] =
          'Bearer ' + access_token
        const salesforceLeads = await axios.get(
          instance_url+'/services/data/v57.0/query?q=SELECT+Owner.name,+FIELDS(ALL)+FROM+contact+Limit+200'
        )
        res.send(salesforceLeads.data.records)
      }
    } catch (error) {
      console.log("Error", error)
      res.send(error)
    }
  } else {
    res.send({ error: 'request not permited' })
  }
}
