import type { NextApiRequest, NextApiResponse } from 'next';
import { axios } from 'lib';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const body = JSON.parse(req.body);
    body.text = body.text.replace(/\s/g, '%20');
    
    const qrCodeResponse = await axios.post(
        `${process.env.QR_CODE_API}`,
        {
            qrtype:"dynamic",
            apikey: process.env.QR_CODE_API_KEY,
            data: `${process.env.BASE_URL}/qr/count${body.text}`,
            transparent: "on",
            frontcolor: "#000000",
            marker_out_color: "#000000",
            marker_in_color: "#000000",
            pattern: "default",
            marker: "default",
            marker_in: "default",
            optionlogo: "none"
        },
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );
    console.log(qrCodeResponse.data)

    if (!qrCodeResponse) {
      return res.status(500).json({ error: 'Error while generating QR Code' })
    }
    res.json({ data: qrCodeResponse.data })
  } else {
    res.setHeader('Allow', ['GET', 'POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
