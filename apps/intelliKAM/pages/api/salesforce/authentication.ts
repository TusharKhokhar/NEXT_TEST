import type { NextApiRequest, NextApiResponse } from 'next'
// import { axios, stringifyParams } from 'lib'
import FormData from 'form-data'
import axios from 'axios';

axios.defaults.headers.common['Content-Type'] =
  'application/x-www-form-urlencoded'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // const clientId: any = '3MVG9wt4IL4O5wvJvbGsSAYDib6frb.5gdqb12JDr991vCYBpM_4z3ldnTn6A5tn7DDQQjwDMQqzRUoEp3Tlx'
  // const clientSecret: any = 'E4429E452404DA865D530A35C63441BFD826ECD61CEE681BBD6D6B9AC72A24D1'
  // const baseUrl = 'https://leadtailor.debugme.in'

  const Api_Url = process.env.SALESFORCE_API_URL //https://login.salesforce.com
  const clientId: any = process.env.NEXT_PUBLIC_SALESFORCE_CLIENT_ID //3MVG9wt4IL4O5wvJvbGsSAYDib6frb.5gdqb12JDr991vCYBpM_4z3ldnTn6A5tn7DDQQjwDMQqzRUoEp3Tlx
  const clientSecret: any = process.env.NEXT_PUBLIC_SALESFORCE_CLIENT_SECRET //E4429E452404DA865D530A35C63441BFD826ECD61CEE681BBD6D6B9AC72A24D1
  const baseUrl = process.env.BASE_URL //'http://localhost:3000'
  const endPoint = process.env.NEXT_PUBLIC_SALESFORCE_API_CALLBACK_ENDPOINT ///api/salesforce/callback

  if (req.method === 'POST') {
    const newCode = req.body.body.code
    const formData: any = new FormData()
    formData.append('code', newCode)
    formData.append('grant_type', 'authorization_code')
    formData.append('client_id', clientId)
    formData.append('client_secret', clientSecret)
    formData.append('redirect_uri', `${baseUrl}${endPoint}`)

    // console.log('Form Data', formData)

    try {
      // const salesforceAccessTokenResponse: any = await fetch(
      //   'https://login.salesforce.com/services/oauth2/token',
      //   {
      //     method: 'POST',
      //     body: formData,
      //   }
      // )
      // const responseData = await salesforceAccessTokenResponse.json()
      // console.log('Response', responseData)

      // res.send(responseData)

      let data = new FormData()
      data.append('code', newCode)
      data.append('grant_type', 'authorization_code')
      data.append('client_id', clientId)
      data.append('client_secret', clientSecret)
      data.append('redirect_uri', `${baseUrl}${endPoint}`)
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://login.salesforce.com/services/oauth2/token',
        headers: {
          Cookie:
            'BrowserId=OkwgIf4REe2yzk2xM2-GJA; CookieConsentPolicy=0:0; LSKey-c$CookieConsentPolicy=0:0',
          ...data.getHeaders(),
        },
        data: data,
      }

      axios
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data))
          res.send(JSON.stringify(response.data))
        })
        .catch((error) => {
          console.log(error)
        })
    } catch (error: any) {
      console.log('Error Message', error)
    }
  } else {
    res.send({ error: 'error' })
  }
}
