import React from 'react'
// import ReactPaginate from 'react-paginate'

type PaginationProps = {
  pageCount: number
  onPageChange: (selected: number) => void
}

const Pagination: React.FC<PaginationProps> = ({ pageCount, onPageChange }) => {
  const customStyles = {
    pagination: 'flex justify-center mt-8 space-x-2',
    pageLink:
      'bg-white px-4 py-2 rounded-md text-black border border-black hover:bg-black hover:text-white',
    activeLink: 'bg-black text-white px-4 py-2 rounded-md',
    disabledLink:
      'bg-gray-200 px-4 py-2 rounded-md text-gray-400 pointer-events-none',
  }

  const handlePageChange = ({ selected }: { selected: number }) => {
    onPageChange(selected + 1)
  }

  return (
    // <ReactPaginate
    //   pageCount={pageCount}
    //   onPageChange={handlePageChange}
    //   containerClassName={customStyles.pagination}
    //   pageClassName={customStyles.pageLink}
    //   activeClassName={customStyles.activeLink}
    //   disabledClassName={customStyles.disabledLink}
    // />
    <div></div>
  )
}

export default Pagination

// to import this component in any table, we just need to follow these steps
/*
import React, { useState } from 'react'
import { IoSearch } from 'react-icons/io5'
import Pagination from './Pagination'

// Rest of your code...

const TableComponents: React.FC<TableProps> = () => {
  // Rest of your code...

  const handlePageChange = (selected: number) => {
    setPageNumber(selected)
  }

  // Rest of your code...

  return (
    <div className="max-w-full mx-auto py-6 sm:px-6 lg:px-8 mt-[3%]">

      // Rest of your code
      // Table content 
      // Rest of your code 

      <Pagination
        pageCount={pageCount}
        onPageChange={handlePageChange}
      />
    </div>
  )
}

export default TableComponents
*/