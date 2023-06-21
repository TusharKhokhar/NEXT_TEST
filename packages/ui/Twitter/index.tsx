import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { safeFetch } from 'fetcher';

const SCOPE_TWITTER = process.env.NEXT_PUBLIC_SCOPE_TWITTER
const TWITTER_OAUTH_URL = process.env.NEXT_PUBLIC_TWITTER_OAUTH_URL
const TWITTER_CALLBACK_URL = process.env.NEXT_PUBLIC_TWITTER_CALLBACK_URL
const TWITTER_CLIENT_KEY = process.env.NEXT_PUBLIC_TWITTER_CLIENT_KEY

const twitterOAuthUrl =
  TWITTER_OAUTH_URL +
  '/authorize?response_type=code&client_id=' +
  TWITTER_CLIENT_KEY +
  '&redirect_uri=' +
  TWITTER_CALLBACK_URL +
  '&scope=' +
  SCOPE_TWITTER +
  '&state=state&code_challenge=challenge&code_challenge_method=plain'

type Props = {
  btntxt?: string
}

export const TwitterButton: React.FC<Props> = (props) => {
  const router = useRouter()
  const handleTwitterLogin = async () => {
    if (props.btntxt == 'Connect Twitter') {
      router.push(twitterOAuthUrl)
    }
    else {
      const data = await safeFetch('/api/twitter', {
        body: {
          action: 'delete',
        },
      })
      if (data) {
        console.log(data);
        router.reload()
      }
      else {
        console.log(data);
        router.push('/')
      }
    }
  }

  return (
    <>
      <button className="button"
        onClick={handleTwitterLogin} >
        {props.btntxt}
      </button>

      <style jsx>{``}</style>
    </>
  )
}
