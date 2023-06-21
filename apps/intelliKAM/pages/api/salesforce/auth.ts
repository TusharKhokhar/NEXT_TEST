import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const Api_Url = process.env.SALESFORCE_API_URL;//https://login.salesforce.com
    const clientId:any = process.env.NEXT_PUBLIC_SALESFORCE_CLIENT_ID;//3MVG9wt4IL4O5wvJvbGsSAYDib6frb.5gdqb12JDr991vCYBpM_4z3ldnTn6A5tn7DDQQjwDMQqzRUoEp3Tlx
    const clientSecret:any = process.env.NEXT_PUBLIC_SALESFORCE_CLIENT_SECRET//E4429E452404DA865D530A35C63441BFD826ECD61CEE681BBD6D6B9AC72A24D1
    const baseUrl = process.env.BASE_URL; //'http://localhost:3000'
    const endPoint = process.env.NEXT_PUBLIC_SALESFORCE_API_CALLBACK_ENDPOINT;///api/salesforce/callback
    const salesForceRedirectURL = `${Api_Url}/services/oauth2/authorize?client_id=${clientId}&redirect_uri=${baseUrl}${endPoint}&response_type=code`;

    console.log("salesForceRedirectURL*************salesForceRedirectURL",salesForceRedirectURL)
        res.send({redirect: salesForceRedirectURL});
  } else {
    res.send({error: 'request not permited'});
  }
}
