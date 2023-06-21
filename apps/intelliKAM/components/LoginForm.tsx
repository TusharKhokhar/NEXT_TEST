import React, { useEffect, useState } from 'react'
import Input from '../common/Input'
import Button, { ButtonKind, ButtonSize } from '../common/Button'
import { useRouter } from 'next/router'
import { signIn } from 'next-auth/react'
import { useSession, signOut } from 'next-auth/react'
import axios from 'axios'

export default function LoginForm() {
  const router = useRouter()
  const { data: session, status }: any = useSession()

  useEffect(() => {
    if (session && session.user && status === 'authenticated') {
      router.push(`/dashboard`)
    }
  }, [session, status])

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const onChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onSubmit = async (e: any) => {
    e.preventDefault()
    const response = await axios.post('/api/login', { email: formData.email })
    if (response && response.status === 200) {
      signIn(
        'email',
        {
          email: formData.email,
          callbackUrl: `${window.location.origin}/login`,
        },
        {
          account: response.data.data,
        }
      )
    }
  }

  return (
    <div>
      <form className="w-full">
        <Input
          label="Email"
          id="email"
          type="text"
          placeholder="Email here"
          name="email"
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
              Login{' '}
            </Button>
          </a>
          {/* </Link> */}
        </div>
      </form>
    </div>
  )
}
