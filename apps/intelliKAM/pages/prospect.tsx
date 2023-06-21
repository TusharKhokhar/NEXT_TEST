import { useEffect, useState } from 'react'
import { axios, stringifyParams } from 'lib'
import { useRouter } from 'next/router'
import ProspectTable from '../components/ProspectTable'

export default function Prospect() {
  const [accessTokenDetails, setAccessToken] = useState({} as any)
  const [leads, setLeads] = useState([])
  const [leads2, setLeads2] = useState([])
  const [reportDataState, setReportData] = useState({} as any)

  const router = useRouter()

  // useEffect(() => {
  //   ; (async () => {
  //     if(router.query.code && Object.keys(reportDataState).length === 0) {
  //       const auth = await axios.get(`/api/salesforce/token?code=${router.query.code}`);
  //       setAccessToken(auth.data);
  //       const leadsData:any = await axios.post(`/api/salesforce/leads`,
  //           stringifyParams({
  //             access_token: auth.data.access_token,
  //             instance_url: auth.data.instance_url
  //           })
  //         );
  //         setLeads(leadsData);
  //     }
  //   })()
  // }, [router.query.code]);

  const fetchLeads = async () => {
    const leadsData2: any = await axios.post(
      `/api/salesforce/leads`,
      stringifyParams({
        instance_url: 'https://chiraagh-dev-ed.develop.my.salesforce.com',
        access_token:
          '00D5i00000CaPco!AQsAQLJv3mTUR0KdsDxbjdtcBiuzzwBqw1y.cLzTys8kCo.qKQaGKg71gju8XTNu3DCPiQgBFxQwnTZEKv8RLwC7ALjdkRZc',
        // access_token: accessTokenDetails['access_token'],
        // instance_url: accessTokenDetails['instance_url'],
      })
    )
    setLeads2(leadsData2.data.data)
  }

  useEffect(() => {
    console.log('leads2', leads2)
  }, [leads2])

  return (
    <>
      {/* <button onClick={fetchLeads}>Fetch Leads</button> */}
      {/* {leads2?.length > 0 && (
        <ul>
          {leads2.map((lead: any) => (
            <li key={lead.id}>
              Name:&ensp; {lead.firstName + ' ' + lead.lastName},&ensp;&ensp;&ensp;
              Email: &ensp;{lead.email},&ensp;&ensp;&ensp;
              CompanyName:&ensp;{lead.companyName}
            </li>
          ))}
        </ul>
      )} */}
      <ProspectTable  data={[]}/>
    </>
  )
}
