import { useRouter } from 'next/router'
import React from 'react'
import { useState } from 'react'
import Button, { ButtonKind, ButtonSize } from '../common/Button'
import Input from '../common/Input'

const AddUserDialog = ({ showDialog, setShowDialog }: any) => {
  const router = useRouter()
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

  const onSubmit = async (e: any) => {
    try {
      e.preventDefault()
      const response = await fetch(`/api/adduser`, {
        method: 'POST',
        body: JSON.stringify({
          ...formData,
          accountNumber: router?.query?.account || 0,
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
      alert('User added successfully...')
      return
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={`popup ${showDialog ? 'active' : 'inactive'}`}>
      <div className="overlay"></div>
      <div className="popup-content">
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
            <div className="flex">
              <Button
                kind={ButtonKind.primaryCta}
                size={ButtonSize.medium}
                onClick={onSubmit}
                className="mr-2"
                type="button"
              >
                Add
              </Button>
              <Button
                kind={ButtonKind.secondaryCta}
                size={ButtonSize.medium}
                type="button"
                onClick={() => setShowDialog(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
      <style jsx>{`
        .popup.active {
          display: block;
          width: 100vw;
          min-height: 100%;
          position: fixed;
          top: 0;
          left: 0;
          z-index: 1000;
          min-width: 375px;
        }
        .overlay {
          width: 100%;
          height: 100%;
          background-color: #dfdfdfe6;
          position: absolute;
          top: 0;
          left: 0;
          z-index: -1;
        }
        .popup.inactive {
          display: none;
        }
        .popup-content {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translateX(-50%) translateY(-50%);
          background: #121212;
          box-shadow: 2px 2px 24px rgba(0, 0, 0, 0.5);
          border-radius: 8px;
          background: white;
          padding: 20px 40px 30px 40px;
          min-width: 800px;
          max-height: 90%;
          overflow-x: hidden;
          overflow-y: auto;
        }
      `}</style>
    </div>
  )
}

export default AddUserDialog
