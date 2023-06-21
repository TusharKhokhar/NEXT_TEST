import React, { useState } from 'react'
import Input from '../common/Input'
import Link from 'next/link'
import Button, { ButtonKind, ButtonSize } from '../common/Button'
import { useRouter } from 'next/router'

export default function UserForm() {
  const router = useRouter()
  const { query } = router
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    jobTitle: '',
    phone: '',
    password: 'test@123',
  })

  const onChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  function randomInteger() {
    let min = 0
    let max = 2147483647 // Maximum Value Signed for Int 
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  const onSubmit = async (e: any) => {
    try {
      e.preventDefault()
      const accountNumber = randomInteger()
      const response = await fetch(`/api/auth/signup`, {
        method: 'POST',
        body: JSON.stringify({
          ...formData,
          accountNumber: accountNumber,
          userType: 'ADMIN',
        }),
      })
      const { data: signUpData, error: signUpError } = await response.json()
      if (signUpError) {
        alert(signUpError)
        return
      }
      const createViewRes = await fetch(`/api/users/createview`, {
        method: 'POST',
        body: JSON.stringify({}),
      })

      const { data: createViewData, error: createViewError } =
        await createViewRes.json()

      if (createViewError) {
        alert(createViewError)
        return
      }
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        jobTitle: '',
        phone: '',
        password: 'test@123',
      })
      alert('User created successfully...')
      router.push('/login')
      return
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <form className="w-full">
        <Input
          label="First Name"
          id="first-name"
          type="text"
          placeholder="First name here"
          name="firstName"
          value={formData.firstName}
          onChange={onChange}
        />
        <Input
          label="Last Name"
          id="last-name"
          type="text"
          placeholder="Last name here"
          name="lastName"
          value={formData.lastName}
          onChange={onChange}
        />
        <Input
          label="Email"
          id="email"
          type="text"
          placeholder="Email here"
          name="email"
          value={formData.email}
          onChange={onChange}
        />
        <Input
          label="Phone Number"
          id="phone-number"
          type="text"
          name="phone"
          value={formData.phone}
          placeholder="Phone number here"
          onChange={onChange}
        />
        <Input
          label="Job Title"
          id="job-title"
          type="text"
          placeholder="Job title here"
          name="jobTitle"
          value={formData.jobTitle}
          onChange={onChange}
        />
        <div className="">
          {/* <Link href="/plans"> */}
          <a>
            <Button
              kind={ButtonKind.primaryCta}
              size={ButtonSize.medium}
              onClick={onSubmit}
            >
              Sign Up
            </Button>
          </a>
          {/* </Link> */}
        </div>
      </form>
    </div>
  )
}
