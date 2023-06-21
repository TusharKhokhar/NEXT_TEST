import React, { useEffect, useState } from 'react'
// import ReactPaginate from 'react-paginate'
// import { IoSearch } from 'react-icons/io5'
import Select from 'react-select';

type TableProps = {
  data: any[]
}

const data = [
  {
    id: 1,
    prospectCompany: 'ABC Company',
    website: 'www.abc.com',
    industry: 'Technology',
    firstName: 'John',
    surname: 'Doe',
    jobTitle: 'Software Engineer',
    emailAddress: 'john.doe@abc.com',
    countryCode: '+1',
    phone: '123-456-7890',
    previousCampaigns: 2,
  },
  {
    id: 2,
    prospectCompany: 'XYZ Inc.',
    website: 'www.xyz.com',
    industry: 'Retail',
    firstName: 'Jane',
    surname: 'Smith',
    jobTitle: 'Marketing Manager',
    emailAddress: 'jane.smith@xyz.com',
    countryCode: '+44',
    phone: '123-456-7890',
    previousCampaigns: 4,
  },
  {
    id: 3,
    prospectCompany: '123 Corp',
    website: 'www.123.com',
    industry: 'Finance',
    firstName: 'Bob',
    surname: 'Johnson',
    jobTitle: 'Accountant',
    emailAddress: 'bob.johnson@123.com',
    countryCode: '+1',
    phone: '123-456-7890',
    previousCampaigns: 1,
  },
  {
    id: 4,
    prospectCompany: 'Acme Co.',
    website: 'www.acme.com',
    industry: 'Manufacturing',
    firstName: 'Alice',
    surname: 'Williams',
    jobTitle: 'Production Manager',
    emailAddress: 'alice.williams@acme.com',
    countryCode: '+44',
    phone: '123-456-7890',
    previousCampaigns: 3,
  },
  {
    id: 5,
    prospectCompany: 'Beta Inc.',
    website: 'www.beta.com',
    industry: 'Technology',
    firstName: 'Chris',
    surname: 'Taylor',
    jobTitle: 'IT Manager',
    emailAddress: 'chris.taylor@beta.com',
    countryCode: '+1',
    phone: '123-456-7890',
    previousCampaigns: 2,
  },
  {
    id: 6,
    prospectCompany: 'Gamma Corp',
    website: 'www.gamma.com',
    industry: 'Finance',
    firstName: 'Emily',
    surname: 'Scott',
    jobTitle: 'Financial Analyst',
    emailAddress: 'emily.scott@gamma.com',
    countryCode: '+44',
    phone: '123-456-7890',
    previousCampaigns: 5,
  },
  {
    id: 7,
    prospectCompany: 'Delta Ltd.',
    website: 'www.delta.com',
    industry: 'Retail',
    firstName: 'Mike',
    surname: 'Clark',
    jobTitle: 'Sales Manager',
    emailAddress: 'mike.clark@delta.com',
    countryCode: '+1',
    phone: '123-456-7890',
    previousCampaigns: 0,
  },
  {
    id: 8,
    prospectCompany: 'Epsilon Co.',
    website: 'www.epsilon.com',
    industry: 'Manufacturing',
    firstName: 'Jennifer',
    surname: 'Garcia',
    jobTitle: 'Quality Control Manager',
    emailAddress: 'jennifer.garcia@epsilon.com',
    countryCode: '+44',
    phone: '123-456-7890',
    previousCampaigns: 3,
  },
  {
    id: 9,
    prospectCompany: 'Zeta Corp',
    website: 'www.zeta.com',
    industry: 'Technology',
    firstName: 'David',
    surname: 'Lee',
    jobTitle: 'Product Manager',
    emailAddress: 'david.lee@zeta.com',
    countryCode: '+1',
    phone: '123-456-7890',
    previousCampaigns: 1,
  },
  {
    id: 10,
    prospectCompany: 'Eta Inc.',
    website: 'www.eta.com',
    industry: 'Retail',
    firstName: 'Samantha',
    surname: 'Brown',
    jobTitle: 'Sales Associate',
    emailAddress: 'samantha.brown@eta.com',
    countryCode: '+44',
    phone: '123-456-7890',
    previousCampaigns: 2,
  },
  {
    id: 11,
    prospectCompany: 'Theta Corp',
    website: 'www.theta.com',
    industry: 'Finance',
    firstName: 'Adam',
    surname: 'Wilson',
    jobTitle: 'Financial Advisor',
    emailAddress: 'adam.wilson@theta.com',
    countryCode: '+1',
    phone: '123-456-7890',
    previousCampaigns: 0,
  },
  {
    id: 12,
    prospectCompany: 'Iota Ltd.',
    website: 'www.iota.com',
    industry: 'Manufacturing',
    firstName: 'Rachel',
    surname: 'Lee',
    jobTitle: 'Production Coordinator',
    emailAddress: 'rachel.lee@iota.com',
    countryCode: '+44',
    phone: '123-456-7890',
    previousCampaigns: 1,
  },
  {
    id: 13,
    prospectCompany: 'Kappa Co.',
    website: 'www.kappa.com',
    industry: 'Technology',
    firstName: 'Brian',
    surname: 'Taylor',
    jobTitle: 'Software Developer',
    emailAddress: 'brian.taylor@kappa.com',
    countryCode: '+1',
    phone: '123-456-7890',
    previousCampaigns: 3,
  },
  {
    id: 14,
    prospectCompany: 'Lambda Corp',
    website: 'www.lambda.com',
    industry: 'Finance',
    firstName: 'Caroline',
    surname: 'Lopez',
    jobTitle: 'Account Manager',
    emailAddress: 'caroline.lopez@lambda.com',
    countryCode: '+44',
    phone: '123-456-7890',
    previousCampaigns: 2,
  },
  {
    id: 15,
    prospectCompany: 'Nu Inc.',
    website: 'www.nu.com',
    industry: 'Retail',
    firstName: 'Mark',
    surname: 'Harris',
    jobTitle: 'Marketing Coordinator',
    emailAddress: 'mark.harris@nu.com',
    countryCode: '+1',
    phone: '123-456-7890',
    previousCampaigns: 1,
  },
  {
    id: 16,
    prospectCompany: 'Omicron Ltd.',
    website: 'www.omicron.com',
    industry: 'Manufacturing',
    firstName: 'Julia',
    surname: 'Gonzalez',
    jobTitle: 'Logistics Manager',
    emailAddress: 'julia.gonzalez@omicron.com',
    countryCode: '+44',
    phone: '123-456-7890',
    previousCampaigns: 4,
  },
]
const customStyles = {
  pagination: 'flex justify-center mt-8 space-x-2',
  pageLink:
    'bg-white px-4 py-2 rounded-md text-black border border-black hover:bg-black hover:text-white',
  activeLink: 'bg-black text-white px-4 py-2 rounded-md',
  disabledLink:
    'bg-gray-200 px-4 py-2 rounded-md text-gray-400 pointer-events-none',
}

const TableComponents2: React.FC<TableProps> = () => {
  const [pageNumber, setPageNumber] = useState(1)
  const [contacts, setContacts] = useState([])
  const [filtered, setFiltered] = useState([])
  const [select2, setSelect2] = useState(undefined);
  const usersPerPage = 5
  const pagesVisited = (pageNumber - 1) * usersPerPage
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters]:any = useState({
    industry: '',
    jobTitle: '',
    firstName: '',
    website: '',
    prospectCompany: '',
  })
  const filteredData = filtered
  
  useEffect(() => {
    // console.log(filteredData)
  }, [filtered])
  

  const onFilteredChangeCustom = (value:any, accessor:any) => {
    let filteredData:any = data;
    const filterKeys:any = Object.keys(filters);
    
  
    // Apply filters
    filterKeys.forEach((key:any) => {
        // console.log("filteredData",filters);
      if (filters[key] !== null) {
        console.log("filteredData",filters);
        filteredData = filteredData.filter((item:any) =>{
            // console.log("item",item[key]);
            item[key].includes(filters[key])
        }
        );
      }
    });
  
    // Apply search term
    if (value !== "") {
      filteredData = filteredData.filter((item:any) =>
        item.firstName.includes(value)
      );
    }
  
    setFiltered(filteredData);
  };

  const handleFilterChange = (value: any, accessor: any) => {
    onFilteredChangeCustom(value, accessor)
    setSearchTerm(value) // Update the searchTerm state
    setFilters((prevFilters:any) => ({
      ...prevFilters,
      [accessor]: value, // Update the specific filter value
    }))
  }

  const changePage = ({ selected }: { selected: number }) => {
    setPageNumber(selected + 1)
  }

  const pageCount = Math.ceil(filteredData.length / usersPerPage)

  const handleImportContacts = async () => {
    console.log('contactsData')
  }

  const uniqueIndustries = [...new Set(data.map((item) => item.industry))]
  const uniqueFirstNames = [...new Set(data.map((item) => item.firstName))]
  const uniqueWebsites = [...new Set(data.map((item) => item.website))]
  const uniqueCompanies = [...new Set(data.map((item) => item.prospectCompany))]

  return (
    <div></div>
    // <div className="max-w-full mx-auto py-6 sm:px-6 lg:px-8 mt-[3%]">
    //   <div className="flex flex-wrap justify-between items-center">
    //   <Select
    //     // style={{ width: '50%', marginBottom: '20px' }}
    //     onChange={(entry:any) => {
    //       setSelect2(entry);
    //       onFilteredChangeCustom(
    //         entry.map((o:any) => {
    //           return o.value;
    //         }),
    //         'firstName'
    //       );
    //     }}
    //     value={select2}
    //     isMulti={true}
    //     options={data.map((o, i) => {
    //       return { id: i, value: o.firstName, label: o.firstName };
    //     })}
    //   />
    //     <h2 className="text-lg leading-6 font-medium text-gray-900 w-full md:w-auto mb-4 md:mb-0">
    //       Your Prospect Contacts
    //     </h2>
    //     <div className="flex items-center w-full md:w-auto">
    //       <div className="relative text-gray-400 focus-within:text-gray-600 w-full md:w-auto">
    //         <span className="absolute inset-y-0 left-0 flex items-center pl-2">
    //           <IoSearch className="h-5 w-5" aria-hidden="true" />
    //         </span>
    //         <input
    //           className="block w-full pl-10 pr-3 py-2 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
    //           style={{ backgroundColor: '#E8EDEF' }}
    //           type="text"
    //           placeholder="Search"
    //           value={searchTerm}
    //           onChange={(e) => setSearchTerm(e.target.value)}
    //         />
    //       </div>
    //     </div>
    //   </div>

    //   {/* Filters */}
    //   <div className="flex justify-between items-center mt-4">

    //     <select
    //       className="block w-48 pl-3 pr-10 py-2 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
    //       style={{ backgroundColor: '#E8EDEF' }}
    //       value={filters.industry}
    //       onChange={(e) => handleFilterChange(e.target.value, 'industry')}
    //     >
    //       <option value="">All Industries</option>
    //       {/* Rest of the options */}
    //     </select>

    //     {/* First Name filter */}
    //     <select
    //       className="block w-48 pl-3 pr-10 py-2 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm mt-2"
    //       style={{ backgroundColor: '#E8EDEF' }}
    //       value={filters.firstName}
    //       onChange={(e) => handleFilterChange(e.target.value, 'firstName')}
    //     >
    //       <option value="">All First Names</option>
    //       {/* Rest of the options */}
    //     </select>

    //     {/* Website filter */}
    //     <select
    //       className="block w-48 pl-3 pr-10 py-2 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm mt-2"
    //       style={{ backgroundColor: '#E8EDEF' }}
    //       value={filters.website}
    //       onChange={(e) => handleFilterChange(e.target.value, 'website')}
    //     >
    //       <option value="">All Websites</option>
    //       {/* Rest of the options */}
    //     </select>

    //     {/* Company filter */}
    //     <select
    //       className="block w-48 pl-3 pr-10 py-2 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm mt-2"
    //       style={{ backgroundColor: '#E8EDEF' }}
    //       value={filters.prospectCompany}
    //       onChange={(e) =>
    //         handleFilterChange(e.target.value, 'prospectCompany')
    //       }
    //     >
    //       <option value="">All Companies</option>
    //       {/* Rest of the options */}
    //     </select>

    //     {/* Job title filter */}
    //     <input
    //       className="block w-48 pl-10 pr-3 py-2 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm mt-2"
    //       style={{ backgroundColor: '#E8EDEF' }}
    //       type="text"
    //       placeholder="Search by Job Title..."
    //       value={searchTerm}
    //       onChange={(e) => handleFilterChange(e.target.value, 'jobTitle')}
    //     />
    //   </div>
    //   <div className="mt-4">
    //     <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
    //       <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
    //         <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
    //           <table className="min-w-full divide-y divide-gray-200">
    //             <thead
    //               className="bg-gray-50"
    //               style={{ backgroundColor: '#E8EDEF' }}
    //             >
    //               <tr>
    //                 <th
    //                   scope="col"
    //                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
    //                 >
    //                   select
    //                 </th>
    //                 <th
    //                   scope="col"
    //                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
    //                 >
    //                   Company
    //                 </th>
    //                 <th
    //                   scope="col"
    //                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
    //                 >
    //                   Website
    //                 </th>
    //                 <th
    //                   scope="col"
    //                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
    //                 >
    //                   Industry
    //                 </th>
    //                 <th
    //                   scope="col"
    //                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
    //                 >
    //                   First Name
    //                 </th>
    //                 <th
    //                   scope="col"
    //                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
    //                 >
    //                   Surname
    //                 </th>
    //                 <th
    //                   scope="col"
    //                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
    //                 >
    //                   Job Title
    //                 </th>
    //                 <th
    //                   scope="col"
    //                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
    //                 >
    //                   Email Address
    //                 </th>
    //                 <th
    //                   scope="col"
    //                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
    //                 >
    //                   Country Code
    //                 </th>
    //                 <th
    //                   scope="col"
    //                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
    //                 >
    //                   Phone Number
    //                 </th>
    //                 <th scope="col" className="relative px-6 py-3">
    //                   <span className="sr-only">Edit</span>
    //                 </th>
    //               </tr>
    //             </thead>
    //             <tbody className="bg-white divide-y divide-gray-200">
    //               {filteredData
    //                 .slice(pagesVisited, pagesVisited + usersPerPage)
    //                 .map((item: any) => (
    //                   <tr key={item.id} className="hover:bg-gray-50">
    //                     <td className="px-6 py-4 whitespace-nowrap">
    //                       <input
    //                         type="checkbox"
    //                         className="form-checkbox h-5 w-5 text-blue-600"
    //                       />
    //                     </td>
    //                     <td className="px-6 py-4 whitespace-nowrap">
    //                       <div className="text-sm text-gray-900">
    //                         {item.companyName}
    //                       </div>
    //                     </td>
    //                     <td className="px-6 py-4 whitespace-nowrap">
    //                       <div className="text-sm text-gray-900">
    //                         {item.website}
    //                       </div>
    //                     </td>
    //                     <td className="px-6 py-4 whitespace-nowrap">
    //                       <div className="text-sm text-gray-900">
    //                         {item.industry}
    //                       </div>
    //                     </td>
    //                     <td className="px-6 py-4 whitespace-nowrap">
    //                       <div className="text-sm text-gray-900">
    //                         {item.firstName}
    //                       </div>
    //                     </td>
    //                     <td className="px-6 py-4 whitespace-nowrap">
    //                       <div className="text-sm text-gray-900">
    //                         {item.lastName}
    //                       </div>
    //                     </td>
    //                     <td className="px-6 py-4 whitespace-nowrap">
    //                       <div className="text-sm text-gray-900">
    //                         {item.jobTitle}
    //                       </div>
    //                     </td>
    //                     <td className="px-6 py-4 whitespace-nowrap">
    //                       <div className="text-sm text-gray-900">
    //                         {item.email}
    //                       </div>
    //                     </td>
    //                     <td className="px-6 py-4 whitespace-nowrap">
    //                       <div className="text-sm text-gray-900">
    //                         {item.countryCode}
    //                       </div>
    //                     </td>
    //                     <td className="px-6 py-4 whitespace-nowrap">
    //                       <div className="text-sm text-gray-900">
    //                         {item.phoneNumber}
    //                       </div>
    //                     </td>
    //                     <td className="px-6 py-4 whitespace-nowrap">
    //                       <div className="text-sm text-gray-900">
    //                         {item.previousCampaigns}
    //                       </div>
    //                     </td>
    //                   </tr>
    //                 ))}
    //             </tbody>
    //           </table>
    //         </div>
    //       </div>
    //     </div>
    //   </div>

    //   <div className="relative">
    //     <div className="flex justify-center mt-8">
    //       <ReactPaginate
    //         previousLabel={'previous'}
    //         nextLabel={'next'}
    //         pageCount={pageCount}
    //         onPageChange={changePage}
    //         containerClassName={customStyles.pagination}
    //         pageLinkClassName={customStyles.pageLink}
    //         previousLinkClassName={customStyles.pageLink}
    //         nextLinkClassName={customStyles.pageLink}
    //         activeLinkClassName={customStyles.activeLink}
    //         disabledLinkClassName={customStyles.disabledLink}
    //         pageClassName="pagination-item"
    //       />
    //     </div>
    //     <div className="absolute bottom-4 right-4">
    //       <button
    //         className="bg-black hover:bg-gray-500 hover:text-white text-white px-4 py-2 rounded-full border border-transparent"
    //         onClick={handleImportContacts}
    //       >
    //         Import Contacts
    //       </button>
    //     </div>
    //   </div>
    // </div>
  )
}

export default TableComponents2
