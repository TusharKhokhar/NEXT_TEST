import { useRouter } from 'next/router'
import { axios, stringifyParams } from 'lib'
import { useState, useEffect } from 'react'
import { safeFetch } from 'fetcher'

export default function Docs() {
  const [accessTokenDetails, setAccessToken] = useState({} as any)
  const [reportList, setReportList] = useState([])
  const [reportDataState, setReportData] = useState({} as any)

  let options: any = []
  if (reportList) {
    for (let i = 0; i < reportList.length; i++) {
      options.push({
        value: reportList[i]['Id'],
        label: reportList[i]['Name'],
      })
    }
  }

  const router = useRouter()
  useEffect(() => {
    ;(async () => {
      if (router.query.code && Object.keys(reportDataState).length === 0) {
        const auth = await axios.get(
          `/api/salesforce/token?code=${router.query.code}`
        )
        setAccessToken(auth.data)
        const reportList = await axios.post(
          `/api/salesforce/report-list`,
          stringifyParams({
            access_token: auth.data.access_token,
            instance_url: auth.data.instance_url,
          })
        )
        setReportList(reportList.data.records)
      }
    })()
  }, [router.query.code])

  const connectWithSalesForce = async () => {
    const salesForceLogin = await safeFetch('/api/salesforce/auth', {})
    if (salesForceLogin.redirect) {
      router.push(salesForceLogin.redirect)
    }
  }

  // console.log('leadsData',leadsData);
  return (
    <>
      <div className="button-salesforce-connect">
        <div>
          <button
            onClick={connectWithSalesForce}
            // className="fixed top-40 left-40"
          >
            Connect with Salesforce
          </button>
        </div>
      </div>
    </>
  )
}
