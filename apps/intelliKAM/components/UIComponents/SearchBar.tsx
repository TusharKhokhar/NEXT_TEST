import React, { useState, ChangeEvent } from 'react'
// import { IoSearch } from 'react-icons/io5'

interface SearchBarProps {
  placeholder?: string
  onSearch: (searchQuery: string) => void
  className?: string
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search',
  onSearch,
  className,
}) => {
  const [searchQuery, setSearchQuery] = useState('')

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  const handleSearch = () => {
    onSearch(searchQuery)
  }

  return (
    <div className={`flex items-center ${className}`}>
      <div className="relative">
        {/* <input
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={handleInputChange}
          className="py-2 px-4 pr-10 bg-gray-200 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          style={{
            padding: '0px 8px 0px 15px',
            background: '#E8EDEF',
            border: '2px solid #E8EDEF',
            borderRadius: '3px',
            width: '300px',
            height: '45px',
            fontFamily: 'Lato',
            color: '#020205',
          }}
        /> */}
        <input
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={handleInputChange}
          className="py-2 px-4 pr-10 bg-gray-200 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-black-500 focus:border-transparent focus:border-2 focus:border-black"
          style={{
            padding: '0px 8px 0px 15px',
            background: '#E8EDEF',
            borderRadius: '3px',
            width: '300px',
            height: '45px',
            fontFamily: 'Lato',
            color: '#020205',
          }}
        />
        <div className="absolute top-0 right-0 flex items-center h-full mr-3">
          <button
            onClick={handleSearch}
            className="text-gray-600 focus:outline-none"
          >
            {/* <IoSearch size={20} color="#555555" /> */}
          </button>
        </div>
      </div>
    </div>
  )
}

export default SearchBar
