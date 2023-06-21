// import React from 'react'
// import ReactPaginate from 'react-paginate'
// import { axios, stringifyParams } from 'lib'
// import {
//   Column,
//   Table,
//   useReactTable,
//   ColumnFiltersState,
//   getCoreRowModel,
//   getFilteredRowModel,
//   getFacetedRowModel,
//   getFacetedUniqueValues,
//   getFacetedMinMaxValues,
//   getPaginationRowModel,
//   sortingFns,
//   getSortedRowModel,
//   FilterFn,
//   SortingFn,
//   ColumnDef,
//   flexRender,
//   FilterFns,
// } from '@tanstack/react-table'
// import {
//   RankingInfo,
//   rankItem,
//   compareItems,
// } from '@tanstack/match-sorter-utils'
// // import { faker } from '@faker-js/faker'

// export type Person = {
//   firstName: string
//   lastName: string
//   age: number
//   visits: number
//   progress: number
//   status: 'relationship' | 'complicated' | 'single'
//   subRows?: Person[]
// }

// const persons: Person[] = [
//   {
//     firstName: 'John',
//     lastName: 'Doe',
//     age: 25,
//     visits: 5,
//     progress: 80,
//     status: 'relationship',
//   },
//   {
//     firstName: 'Jane',
//     lastName: 'Smith',
//     age: 32,
//     visits: 10,
//     progress: 100,
//     status: 'complicated',
//   },
//   {
//     firstName: 'Michael',
//     lastName: 'Johnson',
//     age: 45,
//     visits: 8,
//     progress: 60,
//     status: 'single',
//   },
//   {
//     firstName: 'Emily',
//     lastName: 'Wilson',
//     age: 28,
//     visits: 15,
//     progress: 90,
//     status: 'relationship',
//   },
//   {
//     firstName: 'David',
//     lastName: 'Brown',
//     age: 37,
//     visits: 3,
//     progress: 20,
//     status: 'complicated',
//   },
//   {
//     firstName: 'Sophia',
//     lastName: 'Taylor',
//     age: 31,
//     visits: 12,
//     progress: 75,
//     status: 'single',
//   },
//   {
//     firstName: 'Daniel',
//     lastName: 'Anderson',
//     age: 29,
//     visits: 7,
//     progress: 50,
//     status: 'relationship',
//   },
//   {
//     firstName: 'Olivia',
//     lastName: 'Martinez',
//     age: 34,
//     visits: 9,
//     progress: 70,
//     status: 'complicated',
//   },
//   {
//     firstName: 'James',
//     lastName: 'Wilson',
//     age: 27,
//     visits: 6,
//     progress: 40,
//     status: 'single',
//   },
//   {
//     firstName: 'Emma',
//     lastName: 'Johnson',
//     age: 30,
//     visits: 11,
//     progress: 85,
//     status: 'relationship',
//   },
//   {
//     firstName: 'William',
//     lastName: 'Miller',
//     age: 33,
//     visits: 4,
//     progress: 30,
//     status: 'complicated',
//   },
//   {
//     firstName: 'Ava',
//     lastName: 'Anderson',
//     age: 26,
//     visits: 9,
//     progress: 70,
//     status: 'single',
//   },
//   {
//     firstName: 'Liam',
//     lastName: 'Taylor',
//     age: 29,
//     visits: 7,
//     progress: 55,
//     status: 'complicated',
//   },
//   {
//     firstName: 'Isabella',
//     lastName: 'Davis',
//     age: 31,
//     visits: 12,
//     progress: 90,
//     status: 'relationship',
//   },
//   {
//     firstName: 'Noah',
//     lastName: 'Harris',
//     age: 28,
//     visits: 6,
//     progress: 40,
//     status: 'single',
//   },
//   {
//     firstName: 'Sophia',
//     lastName: 'Wilson',
//     age: 33,
//     visits: 5,
//     progress: 35,
//     status: 'complicated',
//   },
//   {
//     firstName: 'Mason',
//     lastName: 'Johnson',
//     age: 30,
//     visits: 11,
//     progress: 75,
//     status: 'relationship',
//   },
//   {
//     firstName: 'Mia',
//     lastName: 'Thompson',
//     age: 27,
//     visits: 8,
//     progress: 60,
//     status: 'single',
//   },
//   {
//     firstName: 'Ethan',
//     lastName: 'Walker',
//     age: 34,
//     visits: 9,
//     progress: 70,
//     status: 'complicated',
//   },
//   {
//     firstName: 'Avery',
//     lastName: 'Robinson',
//     age: 31,
//     visits: 7,
//     progress: 45,
//     status: 'single',
//   },
//   {
//     firstName: 'Harper',
//     lastName: 'Baker',
//     age: 29,
//     visits: 10,
//     progress: 80,
//     status: 'relationship',
//   },
//   {
//     firstName: 'Adam',
//     lastName: 'Williams',
//     age: 36,
//     visits: 7,
//     progress: 50,
//     status: 'single',
//   },
//   {
//     firstName: 'Sophie',
//     lastName: 'Johnson',
//     age: 29,
//     visits: 12,
//     progress: 90,
//     status: 'relationship',
//   },
//   {
//     firstName: 'Benjamin',
//     lastName: 'Brown',
//     age: 41,
//     visits: 5,
//     progress: 30,
//     status: 'complicated',
//   },
//   {
//     firstName: 'Emma',
//     lastName: 'Davis',
//     age: 28,
//     visits: 9,
//     progress: 70,
//     status: 'single',
//   },
//   {
//     firstName: 'William',
//     lastName: 'Anderson',
//     age: 35,
//     visits: 8,
//     progress: 60,
//     status: 'relationship',
//   },
//   {
//     firstName: 'Olivia',
//     lastName: 'Miller',
//     age: 32,
//     visits: 11,
//     progress: 85,
//     status: 'complicated',
//   },
//   {
//     firstName: 'James',
//     lastName: 'Wilson',
//     age: 31,
//     visits: 6,
//     progress: 40,
//     status: 'single',
//   },
//   {
//     firstName: 'Sophia',
//     lastName: 'Moore',
//     age: 33,
//     visits: 10,
//     progress: 75,
//     status: 'relationship',
//   },
//   {
//     firstName: 'Henry',
//     lastName: 'Taylor',
//     age: 27,
//     visits: 4,
//     progress: 20,
//     status: 'complicated',
//   },
//   {
//     firstName: 'Isabella',
//     lastName: 'Clark',
//     age: 30,
//     visits: 15,
//     progress: 100,
//     status: 'single',
//   },
//   {
//     firstName: 'Matthew',
//     lastName: 'Wilson',
//     age: 38,
//     visits: 7,
//     progress: 55,
//     status: 'complicated',
//   },
//   {
//     firstName: 'Ava',
//     lastName: 'Robinson',
//     age: 26,
//     visits: 9,
//     progress: 65,
//     status: 'relationship',
//   },
//   {
//     firstName: 'Lucas',
//     lastName: 'Thompson',
//     age: 29,
//     visits: 6,
//     progress: 35,
//     status: 'single',
//   },
//   {
//     firstName: 'Amelia',
//     lastName: 'Harris',
//     age: 31,
//     visits: 12,
//     progress: 80,
//     status: 'complicated',
//   },
//   {
//     firstName: 'Alexander',
//     lastName: 'Walker',
//     age: 28,
//     visits: 5,
//     progress: 25,
//     status: 'single',
//   },
//   {
//     firstName: 'Chloe',
//     lastName: 'Stewart',
//     age: 34,
//     visits: 8,
//     progress: 60,
//     status: 'relationship',
//   },
//   {
//     firstName: 'Daniel',
//     lastName: 'Green',
//     age: 27,
//     visits: 7,
//     progress: 50,
//     status: 'single',
//   },
//   {
//     firstName: 'Evelyn',
//     lastName: 'Parker',
//     age: 32,
//     visits: 10,
//     progress: 75,
//     status: 'complicated',
//   },
//   {
//     firstName: 'Michael',
//     lastName: 'Baker',
//     age: 30,
//     visits: 9,
//     progress: 70,
//     status: 'relationship',
//   },
//   {
//     firstName: 'Emily',
//     lastName: 'Garcia',
//     age: 35,
//     visits: 6,
//     progress: 45,
//     status: 'complicated',
//   },
//   {
//     firstName: 'Jackson',
//     lastName: 'Campbell',
//     age: 33,
//     visits: 8,
//     progress: 55,
//     status: 'single',
//   },
// ]

// export type TableProps = {
//   data: any[]
// }

// // const data: TableProps[] = [
// //   {
// //     id: 1,
// //     prospectCompany: 'ABC Company',
// //     website: 'www.abc.com',
// //     industry: 'Technology',
// //     firstName: 'John',
// //     surname: 'Doe',
// //     jobTitle: 'Software Engineer',
// //     emailAddress: 'john.doe@abc.com',
// //     countryCode: '+1',
// //     phone: '123-456-7890',
// //     previousCampaigns: 2,
// //   },
// //   {
// //     id: 2,
// //     prospectCompany: 'XYZ Inc.',
// //     website: 'www.xyz.com',
// //     industry: 'Retail',
// //     firstName: 'Jane',
// //     surname: 'Smith',
// //     jobTitle: 'Marketing Manager',
// //     emailAddress: 'jane.smith@xyz.com',
// //     countryCode: '+44',
// //     phone: '123-456-7890',
// //     previousCampaigns: 4,
// //   },
// //   {
// //     id: 3,
// //     prospectCompany: '123 Corp',
// //     website: 'www.123.com',
// //     industry: 'Finance',
// //     firstName: 'Bob',
// //     surname: 'Johnson',
// //     jobTitle: 'Accountant',
// //     emailAddress: 'bob.johnson@123.com',
// //     countryCode: '+1',
// //     phone: '123-456-7890',
// //     previousCampaigns: 1,
// //   },
// //   {
// //     id: 4,
// //     prospectCompany: 'Acme Co.',
// //     website: 'www.acme.com',
// //     industry: 'Manufacturing',
// //     firstName: 'Alice',
// //     surname: 'Williams',
// //     jobTitle: 'Production Manager',
// //     emailAddress: 'alice.williams@acme.com',
// //     countryCode: '+44',
// //     phone: '123-456-7890',
// //     previousCampaigns: 3,
// //   },
// //   {
// //     id: 5,
// //     prospectCompany: 'Beta Inc.',
// //     website: 'www.beta.com',
// //     industry: 'Technology',
// //     firstName: 'Chris',
// //     surname: 'Taylor',
// //     jobTitle: 'IT Manager',
// //     emailAddress: 'chris.taylor@beta.com',
// //     countryCode: '+1',
// //     phone: '123-456-7890',
// //     previousCampaigns: 2,
// //   },
// //   {
// //     id: 6,
// //     prospectCompany: 'Gamma Corp',
// //     website: 'www.gamma.com',
// //     industry: 'Finance',
// //     firstName: 'Emily',
// //     surname: 'Scott',
// //     jobTitle: 'Financial Analyst',
// //     emailAddress: 'emily.scott@gamma.com',
// //     countryCode: '+44',
// //     phone: '123-456-7890',
// //     previousCampaigns: 5,
// //   },
// //   {
// //     id: 7,
// //     prospectCompany: 'Delta Ltd.',
// //     website: 'www.delta.com',
// //     industry: 'Retail',
// //     firstName: 'Mike',
// //     surname: 'Clark',
// //     jobTitle: 'Sales Manager',
// //     emailAddress: 'mike.clark@delta.com',
// //     countryCode: '+1',
// //     phone: '123-456-7890',
// //     previousCampaigns: 0,
// //   },
// //   {
// //     id: 8,
// //     prospectCompany: 'Epsilon Co.',
// //     website: 'www.epsilon.com',
// //     industry: 'Manufacturing',
// //     firstName: 'Jennifer',
// //     surname: 'Garcia',
// //     jobTitle: 'Quality Control Manager',
// //     emailAddress: 'jennifer.garcia@epsilon.com',
// //     countryCode: '+44',
// //     phone: '123-456-7890',
// //     previousCampaigns: 3,
// //   },
// //   {
// //     id: 9,
// //     prospectCompany: 'Zeta Corp',
// //     website: 'www.zeta.com',
// //     industry: 'Technology',
// //     firstName: 'David',
// //     surname: 'Lee',
// //     jobTitle: 'Product Manager',
// //     emailAddress: 'david.lee@zeta.com',
// //     countryCode: '+1',
// //     phone: '123-456-7890',
// //     previousCampaigns: 1,
// //   },
// //   {
// //     id: 10,
// //     prospectCompany: 'Eta Inc.',
// //     website: 'www.eta.com',
// //     industry: 'Retail',
// //     firstName: 'Samantha',
// //     surname: 'Brown',
// //     jobTitle: 'Sales Associate',
// //     emailAddress: 'samantha.brown@eta.com',
// //     countryCode: '+44',
// //     phone: '123-456-7890',
// //     previousCampaigns: 2,
// //   },
// //   {
// //     id: 11,
// //     prospectCompany: 'Theta Corp',
// //     website: 'www.theta.com',
// //     industry: 'Finance',
// //     firstName: 'Adam',
// //     surname: 'Wilson',
// //     jobTitle: 'Financial Advisor',
// //     emailAddress: 'adam.wilson@theta.com',
// //     countryCode: '+1',
// //     phone: '123-456-7890',
// //     previousCampaigns: 0,
// //   },
// //   {
// //     id: 12,
// //     prospectCompany: 'Iota Ltd.',
// //     website: 'www.iota.com',
// //     industry: 'Manufacturing',
// //     firstName: 'Rachel',
// //     surname: 'Lee',
// //     jobTitle: 'Production Coordinator',
// //     emailAddress: 'rachel.lee@iota.com',
// //     countryCode: '+44',
// //     phone: '123-456-7890',
// //     previousCampaigns: 1,
// //   },
// //   {
// //     id: 13,
// //     prospectCompany: 'Kappa Co.',
// //     website: 'www.kappa.com',
// //     industry: 'Technology',
// //     firstName: 'Brian',
// //     surname: 'Taylor',
// //     jobTitle: 'Software Developer',
// //     emailAddress: 'brian.taylor@kappa.com',
// //     countryCode: '+1',
// //     phone: '123-456-7890',
// //     previousCampaigns: 3,
// //   },
// //   {
// //     id: 14,
// //     prospectCompany: 'Lambda Corp',
// //     website: 'www.lambda.com',
// //     industry: 'Finance',
// //     firstName: 'Caroline',
// //     surname: 'Lopez',
// //     jobTitle: 'Account Manager',
// //     emailAddress: 'caroline.lopez@lambda.com',
// //     countryCode: '+44',
// //     phone: '123-456-7890',
// //     previousCampaigns: 2,
// //   },
// //   {
// //     id: 15,
// //     prospectCompany: 'Nu Inc.',
// //     website: 'www.nu.com',
// //     industry: 'Retail',
// //     firstName: 'Mark',
// //     surname: 'Harris',
// //     jobTitle: 'Marketing Coordinator',
// //     emailAddress: 'mark.harris@nu.com',
// //     countryCode: '+1',
// //     phone: '123-456-7890',
// //     previousCampaigns: 1,
// //   },
// //   {
// //     id: 16,
// //     prospectCompany: 'Omicron Ltd.',
// //     website: 'www.omicron.com',
// //     industry: 'Manufacturing',
// //     firstName: 'Julia',
// //     surname: 'Gonzalez',
// //     jobTitle: 'Logistics Manager',
// //     emailAddress: 'julia.gonzalez@omicron.com',
// //     countryCode: '+44',
// //     phone: '123-456-7890',
// //     previousCampaigns: 4,
// //   },
// // ]

// const range = (len: number) => {
//   const arr = []
//   for (let i = 0; i < len; i++) {
//     arr.push(i)
//   }
//   return arr
// }

// export function makeData(...lens: number[]) {
//   const makeDataLevel = (depth = 0): Person[] => {
//     const len = lens[depth]!
//     return range(len).map((d): Person => {
//       return {
//         ...persons[d % persons.length],
//         subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
//       }
//     })
//   }

//   return makeDataLevel()
// }

// // const newPerson = (): Person => {
// //     return {
// //       firstName: faker.name.firstName(),
// //       lastName: faker.name.lastName(),
// //       age: faker.datatype.number(40),
// //       visits: faker.datatype.number(1000),
// //       progress: faker.datatype.number(100),
// //       status: faker.helpers.shuffle<Person['status']>([
// //         'relationship',
// //         'complicated',
// //         'single',
// //       ])[0]!,
// //     }
// //   }
// // const range = (len: number) => {
// //   const arr = []
// //   for (let i = 0; i < len; i++) {
// //     arr.push(i)
// //   }
// //   return arr
// // }
// // export function makeData(...lens: number[]) {
// //   const makeDataLevel = (depth = 0): Person[] => {
// //     const len = lens[depth]!
// //     return range(len).map((d): Person => {
// //       return {
// //         ...newPerson(),
// //         subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
// //       }
// //     })
// //   }

// //   return makeDataLevel()
// // }
// declare module '@tanstack/table-core' {
//   interface FilterFns {
//     fuzzy: FilterFn<unknown>
//   }
//   interface FilterMeta {
//     itemRank: RankingInfo
//   }
// }

// const customStyles = {
//   pagination: 'flex justify-center mt-8 space-x-2',
//   pageLink:
//     'bg-white px-4 py-2 rounded-md text-black border border-black hover:bg-black hover:text-white',
//   activeLink: 'bg-black text-white px-4 py-2 rounded-md',
//   disabledLink:
//     'bg-gray-200 px-4 py-2 rounded-md text-gray-400 pointer-events-none',
// }

// const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
//   // Rank the item
//   const itemRank = rankItem(row.getValue(columnId), value)

//   // Store the itemRank info
//   addMeta({
//     itemRank,
//   })

//   // Return if the item should be filtered in/out
//   return itemRank.passed
// }

// const fuzzySort: SortingFn<any> = (rowA, rowB, columnId) => {
//   let dir = 0

//   // Only sort by rank if the column has ranking information
//   if (rowA.columnFiltersMeta[columnId]) {
//     dir = compareItems(
//       rowA.columnFiltersMeta[columnId]?.itemRank!,
//       rowB.columnFiltersMeta[columnId]?.itemRank!
//     )
//   }

//   // Provide an alphanumeric fallback for when the item ranks are equal
//   return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir
// }

// function Filter({
//   column,
//   table,
// }: {
//   column: Column<any, unknown>
//   table: Table<any>
// }) {
//   const firstValue = table
//     .getPreFilteredRowModel()
//     .flatRows[0]?.getValue(column.id)

//   const columnFilterValue = column.getFilterValue()

//   const sortedUniqueValues = React.useMemo(
//     () =>
//       typeof firstValue === 'number'
//         ? []
//         : Array.from(column.getFacetedUniqueValues().keys()).sort(),
//     [column.getFacetedUniqueValues()]
//   )

//   return typeof firstValue === 'number' ? (
//     <div>
//       <div className="flex space-x-2">
//         <DebouncedInput
//           type="number"
//           min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
//           max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
//           value={(columnFilterValue as [number, number])?.[0] ?? ''}
//           onChange={(value) =>
//             column.setFilterValue((old: [number, number]) => [value, old?.[1]])
//           }
//           placeholder={`Min ${
//             column.getFacetedMinMaxValues()?.[0]
//               ? `(${column.getFacetedMinMaxValues()?.[0]})`
//               : ''
//           }`}
//           className="block w-48 pl-1 pr-4 py-2 text-gray-900 placeholder-gray-500 focus:ring-black-500 focus:border-black-500 sm:text-sm border border-gray-300 focus:ring-1 focus:ring-black rounded-md"
//         />
//         <DebouncedInput
//           type="number"
//           min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
//           max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
//           value={(columnFilterValue as [number, number])?.[1] ?? ''}
//           onChange={(value) =>
//             column.setFilterValue((old: [number, number]) => [old?.[0], value])
//           }
//           placeholder={`Max ${
//             column.getFacetedMinMaxValues()?.[1]
//               ? `(${column.getFacetedMinMaxValues()?.[1]})`
//               : ''
//           }`}
//           className="block w-48 pl-1 pr-4 py-2 text-gray-900 placeholder-gray-500 focus:ring-black-500 focus:border-black-500 sm:text-sm border border-gray-300 focus:ring-1 focus:ring-black rounded-md"
//         />
//       </div>
//       <div className="h-1" />
//     </div>
//   ) : (
//     <>
//       <datalist id={column.id + 'list'}>
//         {sortedUniqueValues.slice(0, 5000).map((value: any) => (
//           <option value={value} key={value} />
//         ))}
//       </datalist>
//       <DebouncedInput
//         type="text"
//         value={(columnFilterValue ?? '') as string}
//         onChange={(value) => column.setFilterValue(value)}
//         placeholder={`Search... (${column.getFacetedUniqueValues().size})`}
//         className="block w-48 pl-1 pr-4 py-2 text-gray-900 placeholder-gray-500 focus:ring-black-500 focus:border-black-500 sm:text-sm border border-gray-300 focus:ring-1 focus:ring-black rounded-md"
//         list={column.id + 'list'}
//       />
//       <div className="h-1" />
//     </>
//   )
// }

// const TableFilter4 = () => {
//   const rerender = React.useReducer(() => ({}), {})[1]
//   const [contacts, setContacts] = React.useState([])
//   const [pageNumber, setPageNumber] = React.useState(1)
//   const usersPerPage = 5
//   const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
//     []
//   )
//   const [globalFilter, setGlobalFilter] = React.useState('')
//   const [searchTerm, setSearchTerm] = React.useState('')
//   const [filteredData, setfilteredData] = React.useState(contacts)
//   const [filteredArray, setFilteredArray] = React.useState([])
//   const [filters, setFilters] = React.useState({
//     industry: '',
//     jobTitle: '',
//     firstName: '',
//     website: '',
//     prospectCompany: '',
//   })

//   const changePage = ({ selected }: { selected: number }) => {
//     setPageNumber(selected + 1)
//   }

//   const pageCount = Math.ceil(globalFilter.length / usersPerPage)

//   const handleImportContacts = async () => {
//     const contactsData: any = await axios.get(`/api/salesforce/leads`)
//     console.log('contactsData', contactsData?.data?.contacts)

//     setContacts(contactsData?.data?.contacts)
//   }

//   let newData: any = []
//   const filterSearch = () => {
//     var stringArray = searchTerm.split(', ')
//     newData = data?.filter(function (obj) {
//       return searchTerm.includes(obj.firstName)
//     })
//     console.log('newData', newData)
//     setFilteredArray(filteredArray)
//     setfilteredData(newData)
//   }
//   React.useEffect(() => {
//     console.log(searchTerm)
//     // setFilter(searchTerm)
//   }, [searchTerm])

//   const columns = React.useMemo<ColumnDef<Person, any>[]>(
//     () => [
//       {
//         header: 'Name',
//         footer: (props) => props.column.id,
//         columns: [
//           {
//             accessorKey: 'firstName',
//             cell: (info) => info.getValue(),
//             footer: (props) => props.column.id,
//           },
//           {
//             accessorFn: (row) => row.lastName,
//             id: 'lastName',
//             cell: (info) => info.getValue(),
//             header: () => <span>Last Name</span>,
//             footer: (props) => props.column.id,
//           },
//           {
//             accessorFn: (row) => `${row.firstName} ${row.lastName}`,
//             id: 'fullName',
//             header: 'Full Name',
//             cell: (info) => info.getValue(),
//             footer: (props) => props.column.id,
//             filterFn: 'fuzzy',
//             sortingFn: fuzzySort,
//           },
//         ],
//       },
//       {
//         header: 'Info',
//         footer: (props) => props.column.id,
//         columns: [
//           {
//             accessorKey: 'age',
//             header: () => 'Age',
//             footer: (props) => props.column.id,
//           },
//           {
//             header: 'More Info',
//             columns: [
//               {
//                 accessorKey: 'visits',
//                 header: () => <span>Visits</span>,
//                 footer: (props) => props.column.id,
//               },
//               {
//                 accessorKey: 'status',
//                 header: 'Status',
//                 footer: (props) => props.column.id,
//               },
//               {
//                 accessorKey: 'progress',
//                 header: 'Profile Progress',
//                 footer: (props) => props.column.id,
//               },
//             ],
//           },
//         ],
//       },
//     ],
//     []
//   )

//   const [data, setData] = React.useState<Person[]>(() => makeData(50000))
//   const refreshData = () => setData((old) => makeData(50000))

//   const table = useReactTable({
//     data,
//     columns,
//     filterFns: {
//       fuzzy: fuzzyFilter,
//     },
//     state: {
//       columnFilters,
//       globalFilter,
//     },
//     onColumnFiltersChange: setColumnFilters,
//     onGlobalFilterChange: setGlobalFilter,
//     globalFilterFn: fuzzyFilter,
//     getCoreRowModel: getCoreRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     getFacetedRowModel: getFacetedRowModel(),
//     getFacetedUniqueValues: getFacetedUniqueValues(),
//     getFacetedMinMaxValues: getFacetedMinMaxValues(),
//     debugTable: true,
//     debugHeaders: true,
//     debugColumns: false,
//   })

//   React.useEffect(() => {
//     if (table.getState().columnFilters[0]?.id === 'fullName') {
//       if (table.getState().sorting[0]?.id !== 'fullName') {
//         table.setSorting([{ id: 'fullName', desc: false }])
//       }
//     }
//   }, [table.getState().columnFilters[0]?.id])

//   return (
//     <div className="max-w-full mx-auto py-6 sm:px-6 lg:px-8 mt-[3%]">
//       <div className="flex flex-wrap justify-between items-center">
//         <h2 className="text-lg leading-6 font-medium text-gray-900 w-full md:w-auto mb-4 md:mb-0">
//           Your Prospect Contacts
//         </h2>
//         <div className="flex items-center w-full md:w-auto">
//           <div className="relative text-gray-400 focus-within:text-gray-600 w-full md:w-auto">
//             <DebouncedInput
//               value={globalFilter ?? ''}
//               onChange={(value: any) => setGlobalFilter(String(value))}
//               style={{ backgroundColor: '#E8EDEF' }}
//               className="block w-full pl-10 pr-3 py-2 text-gray-900 placeholder-gray-500 focus:border-black-500 sm:text-sm border border-gray-300 focus:ring-1 focus:ring-black rounded-md"
//               placeholder="Search all columns..."
//             />
//           </div>
//         </div>
//       </div>
//       <div className="mt-4">
//         <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
//           <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
//             <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead
//                   className="bg-gray-50"
//                   style={{ backgroundColor: '#E8EDEF' }}
//                 >
//                   {table.getHeaderGroups().map((headerGroup) => (
//                     <tr key={headerGroup.id}>
//                       {headerGroup.headers.map((header) => {
//                         return (
//                           <th
//                             key={header.id}
//                             colSpan={header.colSpan}
//                             scope="col"
//                             className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                           >
//                             {header.isPlaceholder ? null : (
//                               <>
//                                 <div
//                                   {...{
//                                     className: header.column.getCanSort()
//                                       ? 'cursor-pointer select-none'
//                                       : '',
//                                     onClick:
//                                       header.column.getToggleSortingHandler(),
//                                   }}
//                                 >
//                                   {flexRender(
//                                     header.column.columnDef.header,
//                                     header.getContext()
//                                   )}
//                                   {{
//                                     asc: ' 🔼',
//                                     desc: ' 🔽',
//                                   }[header.column.getIsSorted() as string] ??
//                                     null}
//                                 </div>
//                                 {header.column.getCanFilter() ? (
//                                   <div>
//                                     <Filter
//                                       column={header.column}
//                                       table={table}
//                                     />
//                                   </div>
//                                 ) : null}
//                               </>
//                             )}
//                           </th>
//                         )
//                       })}
//                     </tr>
//                   ))}
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {table.getRowModel().rows.map((row) => {
//                     return (
//                       <tr key={row.id}>
//                         {row.getVisibleCells().map((cell) => {
//                           return (
//                             <td
//                               key={cell.id}
//                               className="px-6 py-4 whitespace-nowrap"
//                             >
//                               <div className="text-sm text-gray-900">
//                                 {flexRender(
//                                   cell.column.columnDef.cell,
//                                   cell.getContext()
//                                 )}
//                               </div>
//                             </td>
//                           )
//                         })}
//                       </tr>
//                     )
//                   })}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//         <div className="relative">
//           <div className="flex justify-center mt-8">
//             <ReactPaginate
//               previousLabel={'previous'}
//               nextLabel={'next'}
//               pageCount={pageCount}
//               onPageChange={changePage}
//               containerClassName={customStyles.pagination}
//               pageLinkClassName={customStyles.pageLink}
//               previousLinkClassName={customStyles.pageLink}
//               nextLinkClassName={customStyles.pageLink}
//               activeLinkClassName={customStyles.activeLink}
//               disabledLinkClassName={customStyles.disabledLink}
//               pageClassName="pagination-item"
//             />
//             <div className="absolute bottom-4 right-4">
//               <button
//                 className="bg-black hover:bg-gray-500 hover:text-white text-white px-4 py-2 rounded-full border border-transparent"
//                 onClick={handleImportContacts}
//               >
//                 Import Contacts
//               </button>
//             </div>
//             <div className="flex items-center gap-2">
//               <button
//                 className="bg-white hover:bg-black hover:text-white text-black px-4 py-2 border border-gray-300 rounded-md px-4 py-2 focus:ring-1 focus:ring-black cursor-pointer"
//                 onClick={() => table.setPageIndex(0)}
//                 disabled={!table.getCanPreviousPage()}
//               >
//                 {'<<'}
//               </button>
//               <button
//                 className="bg-white hover:bg-black hover:text-white text-black px-4 py-2 border border-gray-300 rounded-md px-4 py-2 focus:ring-1 focus:ring-black cursor-pointer"
//                 onClick={() => table.previousPage()}
//                 disabled={!table.getCanPreviousPage()}
//               >
//                 {'<'}
//               </button>
//               <button
//                 className="bg-white hover:bg-black hover:text-white text-black px-4 py-2 border border-gray-300 rounded-md px-4 py-2 focus:ring-1 focus:ring-black cursor-pointer"
//                 onClick={() => table.nextPage()}
//                 disabled={!table.getCanNextPage()}
//               >
//                 {'>'}
//               </button>
//               <button
//                 className="bg-white hover:bg-black hover:text-white text-black px-4 py-2 border border-gray-300 rounded-md px-4 py-2 focus:ring-1 focus:ring-black cursor-pointer"
//                 onClick={() => table.setPageIndex(table.getPageCount() - 1)}
//                 disabled={!table.getCanNextPage()}
//               >
//                 {'>>'}
//               </button>
//               <span className="flex items-center gap-1">
//                 <div>Page</div>
//                 <strong>
//                   {table.getState().pagination.pageIndex + 1} of{' '}
//                   {table.getPageCount()}
//                 </strong>
//               </span>
//               <span className="flex items-center gap-1">
//                 | Go to page:
//                 <input
//                   type="number"
//                   defaultValue={table.getState().pagination.pageIndex + 1}
//                   onChange={(e) => {
//                     const page = e.target.value ? Number(e.target.value) - 1 : 0
//                     table.setPageIndex(page)
//                   }}
//                   className="block w-48 pl-1 pr-4 py-2 text-gray-900 placeholder-gray-500 focus:ring-black-500 focus:border-black-500 sm:text-sm border border-gray-300 focus:ring-1 focus:ring-black rounded-md"
//                 />
//               </span>
//               <select
//                 className="block w-48 pl-3 pr-10 py-2 text-gray-900 placeholder-gray-500 focus:border-black-500 sm:text-sm border border-gray-300 focus:ring-1 focus:ring-black rounded-md cursor-pointer"
//                 value={table.getState().pagination.pageSize}
//                 onChange={(e) => {
//                   table.setPageSize(Number(e.target.value))
//                 }}
//               >
//                 {[10, 20, 30, 40, 50].map((pageSize) => (
//                   <option key={pageSize} value={pageSize}>
//                     Show {pageSize}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>
//           {/* <div className="absolute bottom-4 right-4">
//     <button
//       className="bg-white hover:bg-black hover:text-white text-black px-4 py-2 border border-gray-300 rounded-md px-4 py-2 focus:ring-1 focus:ring-black"
//       onClick={handleImportContacts}
//     >
//       Import Contacts
//     </button>
//   </div> */}
//         </div>

//         {/* <div>{table.getPrePaginationRowModel().rows.length} Rows</div> */}
//         {/* <div>
//           <button onClick={() => rerender()}>Force Rerender</button>
//         </div> */}
//         {/* <div>
//           <button onClick={() => refreshData()}>Refresh Data</button>
//         </div> */}
//         {/* <pre>{JSON.stringify(table.getState(), null, 2)}</pre> */}
//       </div>
//     </div>
//   )
// }

// // A debounced input react component
// function DebouncedInput({
//   value: initialValue,
//   onChange,
//   debounce = 500,
//   ...props
// }: {
//   value: string | number
//   onChange: (value: string | number) => void
//   debounce?: number
// } & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
//   const [value, setValue] = React.useState(initialValue)

//   React.useEffect(() => {
//     setValue(initialValue)
//   }, [initialValue])

//   React.useEffect(() => {
//     const timeout = setTimeout(() => {
//       onChange(value)
//     }, debounce)

//     return () => clearTimeout(timeout)
//   }, [value])

//   return (
//     <input
//       className="block w-48 pl-1 pr-4 py-2 text-gray-900 placeholder-gray-500 focus:ring-black-500 focus:border-black-500 sm:text-sm border border-gray-300 focus:ring-1 focus:ring-black rounded-md"
//       {...props}
//       value={value}
//       onChange={(e) => setValue(e.target.value)}
//     />
//   )
// }

// export default TableFilter4
