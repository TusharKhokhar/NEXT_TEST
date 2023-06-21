import type { NextApiRequest, NextApiResponse } from "next";
import { axios, stringifyParams } from 'lib';

axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded'
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    if (req.method === 'POST') {
        try {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + req.body.access_token
            const salesforceLeads = await axios.get(
                `${req.body.instance_url}/services/data/v39.0/analytics/reports/${req.body.reportId}`
            );
            res.send(salesforceLeads.data);
        } catch (error) {
            console.log(error)
        }
    } else {
        res.send({error: 'request not permited'});
    }
}
