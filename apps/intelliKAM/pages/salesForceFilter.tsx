import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { axios, stringifyParams } from 'lib'
// import TableComponents6 from '../components/UIComponents/tableFilter6'
import { useParams } from 'react-router-dom'
import TableComponents5 from '../components/UIComponents/tableFilter5'

export default function SalesForceFilter() {
  const router = useRouter()
  const { code }: any = router.query
  const usersPerPage = 5
  const [globalSearch, setGlobalSearch] = useState('')
  const [accessTokenData, setAccessToken]:any = useState('')
  const [filteredData, setfilteredData] = useState([])
  const [allData, setAllData] = useState([])
  const [contacts, setContacts] = useState([])
  const [searchFirstname, setSearchFirstname]: any = useState('')
  const [searchLeadOwner, setSearchLeadOwner] = useState('')
  const [searchWebsite, setSearchWebsite] = useState('')
  const [searchLeadSource, setSearchLeadSource] = useState('')
  const [searchEmail, setSearchEmail] = useState('')
  const [searchCountry, setSearchCountry] = useState('')
  const [searchPhone, setSearchPhone] = useState('')
  const [searchLastName, setSearchLastName]: any = useState('')
  const [searchIndustry, setSearchIndustry] = useState('')
  const [searchJobTitle, setSearchJobTitle] = useState('')

  useEffect(() => {
    const refreshToken = async () => {
      console.log('access code', code)
      if (code !== undefined && code !== null && code) {
        const refreshTokenData: any = await axios.post(
          '/api/salesforce/authentication',
          {
            body: {
              code: code,
            },
          }
        )
        console.log("refreshTokenData",refreshTokenData.data.access_token)
        setAccessToken(refreshTokenData.data)
      }
    }
    refreshToken()
  }, [code])

  const filterGlobalSearch = async () => {
    const contactsData: any = await axios.get('/api/salesforce/contacts', {
      params: {
        GlobalSearch: globalSearch,
        accessToken: accessTokenData.access_token,
        instance_url: accessTokenData.instance_url
      },
    })
    console.log(contactsData.data)
    setfilteredData(contactsData.data)
  }

  const filterFirstNameSearch = async () => {
    const contactsData: any = await axios.get('/api/salesforce/contacts', {
      params: {
        FirstName: searchFirstname,
        Industry: searchIndustry,
        Title: searchJobTitle,
        // AccountName: searchAccountName,
        LeadOwner: searchLeadOwner,
        LastName: searchLastName,
        Website: searchWebsite,
        LeadSource: searchLeadSource,
        Country: searchCountry,
        Email: searchEmail,
        Phone: searchPhone,
        accessToken: accessTokenData.access_token,
        instance_url: accessTokenData.instance_url
      },
    })
    console.log(contactsData.data)
    setfilteredData(contactsData.data)
  }

  const handleImportContacts = async () => {
    const contactsData: any = await axios.get(`/api/salesforce/contacts`, {
      params: {
        accessToken: accessTokenData.access_token,
        instance_url: accessTokenData.instance_url
      },
    })
    setContacts(contactsData.data)
    setAllData(contactsData.data)
    setfilteredData(contactsData.data)

    console.log('contactsData', contactsData.data)
    console.log('filteredData', filteredData)
  }

  return (
    <>
      <div className="container ml-[100px]">
        {/* <div className="row">
          <div className="col">
            <TableComponents6 data={[]} />
          </div>
        </div> */}
        <div className="row">
          <div className="col">
          <TableComponents5
              data={[]}
              usersPerPage={usersPerPage}
              globalSearch={globalSearch}
              setGlobalSearch={setGlobalSearch}
              filterGlobalSearch={filterGlobalSearch}
              filteredData={filteredData}
              setfilteredData={setfilteredData}
              allData={allData}
              setAllData={setAllData}
              contacts={contacts}
              setContacts={setContacts}
              handleImportContacts={handleImportContacts}
              searchFirstname={searchFirstname}
              setSearchFirstname={setSearchFirstname}
              filterFirstNameSearch={filterFirstNameSearch}
              searchLeadOwner={searchLeadOwner}
              setSearchLeadOwner={setSearchLeadOwner}
              searchWebsite={searchWebsite}
              setSearchWebsite={setSearchWebsite}
              searchLeadSource={searchLeadSource}
              setSearchLeadSource={setSearchLeadSource}
              searchEmail={searchEmail}
              setSearchEmail={setSearchEmail}
              searchCountry={searchCountry}
              setSearchCountry={setSearchCountry}
              searchPhone={searchPhone}
              setSearchPhone={setSearchPhone}
              searchLastName={searchLastName}
              setSearchLastName={setSearchLastName}
              searchIndustry={searchIndustry}
              setSearchIndustry={setSearchIndustry}
              searchJobTitle={searchJobTitle}
              setSearchJobTitle={setSearchJobTitle}
            />
          </div>
        </div>
      </div>
    </>
  )
}
