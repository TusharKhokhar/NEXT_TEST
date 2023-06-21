import React, { useState } from 'react'
import Input from '../common/Input'
import Link from 'next/link'
import Button, { ButtonKind, ButtonSize } from '../common/Button'
import { useRouter } from 'next/router'

export default function WhatsappForm() {
  const router = useRouter()
  const { query } = router
  const [formData, setFormData] = useState({
    whatsappNumber: '',
    whatsappText: ''
  })

  const onChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onSubmit = async (e: any) => {
    try {
      e.preventDefault();
      const response = await fetch(`/api/qr`, {
        method: 'POST',
        body: JSON.stringify({
          text: `?qid=${formData.whatsappNumber}&text=${formData.whatsappText}`
        }),
      })
      const { data: signUpData, error: signUpError } = await response.json()
      if (signUpError) {
        alert(signUpError)
        return
      }
      setFormData({
        whatsappNumber: '',
        whatsappText: ''
      })
      alert('QR Generated succeessfully...')
      return
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <form className="w-full">
        <Input
          label="Whtsapp Number"
          id="whatsapp-number"
          type="text"
          placeholder="Whatsapp number here"
          name="whatsappNumber"
          value={formData.whatsappNumber}
          onChange={onChange}
        />
        <Input
          label="Whtsapp Text"
          id="whatsapp-text"
          type="text"
          placeholder="Whatsapp text here"
          name="whatsappText"
          value={formData.whatsappText}
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
              Generate QR Code
            </Button>
          </a>
          {/* </Link> */}
        </div>
      </form>
    </div>
  )
}
