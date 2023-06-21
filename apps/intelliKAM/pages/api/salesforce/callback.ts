import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const code:any = req.query.code;
    if (typeof window !== 'undefined') {
      localStorage.setItem('code', code);
    }
    res.redirect('/salesForceFilter?code='+req.query.code);

  }
}
