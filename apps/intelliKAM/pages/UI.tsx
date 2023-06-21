import React, { useState } from 'react'
// import Input from '../components/UIComponents/Input'
// import Button from '../components/UIComponents/Button'
// import TextArea from '../components/UIComponents/Textarea'
// import Dropdown from '../components/UIComponents/Dropdown'
// import Checkbox from '../components/UIComponents/Checkbox'
// import RadioButton from '../components/UIComponents/RadioButton'
// import TodoList from '../components/UIComponents/TodoList'
// import Card from '../components/UIComponents/Card'
// import DatePicker from '../components/UIComponents/DatePicker'
// import TimePicker from '../components/UIComponents/TimePicker'
// import FormFieldset from '../components/UIComponents/FormFieldset'
// import FormLabel from '../components/UIComponents/FormLabel'
// import Toggle from '../components/UIComponents/ToggleButton'
// import FormDateInput from '../components/UIComponents/DatePicker'
// import SearchBar from '../components/UIComponents/SearchBar'
// import TableComponents from '../components/UIComponents/TableComponent'
// import TableComponent from '../components/UIComponents/TableFilter'
// import TableComponents3 from '../components/UIComponents/tableFilter3'
// import TableFilter4 from '../components/UIComponents/tableFilter4'
// import TableFilter5 from '../components/UIComponents/tableFilter5'
// import TableFilter3 from '../components/UIComponents/tableFilter3'
// import ProspectTable from '../components/ProspectTable'
// import TableComponents6 from '../components/UIComponents/tableFilter6'

const UI = () => {
  const [inputValue, setInputValue] = useState('')
  const [textValue, setTextValue] = useState('')
  const [selectedOption, setSelectedOption] = useState('')
  const [isChecked, setIsChecked] = useState(false)
  const [selectedValue, setSelectedValue] = useState('')
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)

  const handleTimeChange = (time: string | null) => {
    setSelectedTime(time)
  }

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date)
  }

  const headers = ['Name', 'Age', 'Location']

  const data = [
    { name: 'John', age: 25, location: 'New York' },
    { name: 'Jane', age: 30, location: 'London' },
    { name: 'Bob', age: 40, location: 'Paris' },
  ]

  const cellRenderer = (value: any, index: number) => {
    if (index === 1) {
      return <strong>{value}</strong>
    }
    return value
  }

  const rowKeyExtractor = (item: any, index: number) => {
    return item.name
  }
  const handleRadioChange = (value: string) => {
    setSelectedValue(value)
  }

  const radioOptions = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
    { label: 'Option 4', value: 'option4' },
    { label: 'Option 5', value: 'option5' },
  ]

  const handleCheckboxChange = (checked: boolean) => {
    setIsChecked(checked)
  }

  const dropdownOptions = ['Option 1', 'Option 2', 'Option 3']

  const handleDropdownChange = (value: string) => {
    setSelectedOption(value)
  }

  const handleTextChange = (value: string) => {
    setTextValue(value)
  }

  const handleInputChange = (value: string) => {
    setInputValue(value)
  }

  const handleClick = () => {
    console.log('Button clicked!')
  }

  const handleSubmit = () => {
    // Handle form submission
  }
  const radioButtonProps = {
    className: 'custom-radio',
    label: 'Dummy Label',
    name: 'radioOption',
    value: 'option1',
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
      console.log('Selected option:', event.target.value)
    },
  }

  // const formDateInputProps: any = {
  //   className: 'my-custom-input',
  //   value: '2023-05-23',
  //   isError: false,
  //   isValid: true,
  //   selectOnFocus: true,
  //   onChange: (event: any) => {
  //     console.log('Date input changed:', event.target.value)
  //   },
  // }

  const handleSearch = (searchQuery: string) => {
    // Handle the search query
    console.log('Search query:', searchQuery)
  }

  const handleToggle = (isToggled: boolean) => {
    // Handle the toggle state change here
    console.log('Toggle state:', isToggled)
  }

  return (
    <div className="container">
      {/* <div className="row">
        <div className="col p-[20px]">
         
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Input
            value={inputValue}
            label="Name:"
            onChange={handleInputChange}
            disabled={false}
          />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Button
            text="Button"
            textColor="text-white"
            onClick={handleClick}
            disabled={false}
          />
          <Button
            text="Disabled"
            backgroundColor="bg-gray-900"
            textColor="text-white"
            onClick={handleClick}
            disabled={true}
            style={{
              fontSize: '14px',
              padding: '8px 16px',
              borderRadius: '50px',
            }}
          />
          <Button
            text="Custom Style"
            style={{
              backgroundColor: '#FAFCFA',
              borderRadius: '50px',
              border: '1px solid #101935',
              color: 'black',
            }}
            onClick={handleClick}
          />
        </div>
      </div>
      <div className="row">
        <div className="col">
        <Toggle label="Toggle Switch" toggled={true} onClick={handleToggle} />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <TextArea
            value={textValue}
            placeholder="Enter text"
            onChange={handleTextChange}
            disabled={false}
            rows={5}
            cols={40}
            style={{ width: '400px' }}
          />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Dropdown
            value={selectedOption}
            options={dropdownOptions}
            placeholder="Select an option"
            onChange={handleDropdownChange}
            disabled={false}
            style={{}}
          />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <h4>Search Bar</h4>
          <SearchBar
        placeholder="Search anything"
        onSearch={handleSearch}
        className="my-custom-search-bar"
      />
        </div>
      </div>
      <div className="row">
        <div className="col" style={{ margin: '15px' }}>
          <Checkbox
            checked={isChecked}
            label="Check me"
            onChange={handleCheckboxChange}
            disabled={false}
            style={{ fontSize: '16px' }}
          />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <h1>Todo List</h1>
          <TodoList />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Card
            title="Card Title"
            content={<p>This is the card content.</p>}
            backgroundColor="bg-gray-900"
            textColor="text-white"
            borderColor="text-black"
          />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <RadioButton
            value={selectedValue}
            options={radioOptions}
            onChange={handleRadioChange}
            disabled={false}
            style={{ fontSize: '16px' }}
          />
          <p>Selected value: {selectedValue}</p>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <TableComponents3 data={[]} />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <TableComponents6 data={[]}/>
        </div>
      </div>
      <div className="row">
        <div className="col">
        <TableFilter4 />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <TableComponents data={[]}/>
        </div>
      </div>
      <div className="row">
        <div className="col">
        <TableFilter5 data={[]} />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <FormDateInput />
          <DatePicker
            selectedDate={selectedDate}
            onChange={handleDateChange}
            minDate={new Date('2022-01-01')}
            maxDate={new Date('2022-12-31')}
            disabled={false}
            className="custom-datepicker"
            style={{ color: 'blue' }}
          />
          <p>
            Selected Date: {selectedDate ? selectedDate.toDateString() : 'None'}
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <TimePicker
            selectedTime={selectedTime}
            onChange={handleTimeChange}
            minTime="08:00"
            maxTime="18:00"
            disabled={false}
            className="custom-timepicker"
            style={{ color: 'blue' }}
          />
          <p>Selected Time: {selectedTime || 'None'}</p>
        </div>
      </div>  
      <div className="row">
        <div className="col">
        <TableComponent />
        </div>
      </div>

      <ProspectTable data={[]}/> */}
      {/* <div className="row">
        <div className="col">
          <h4>Search Bar</h4>
          <SearchBar
            placeholder="Search anything"
            onSearch={handleSearch}
            className="my-custom-search-bar"
          />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <TableFilter3 data={[]} />
        </div>
      </div> */}
      
    </div>
  )
}

export default UI
