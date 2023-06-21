import { useRouter } from 'next/router'
import { safeFetch } from 'fetcher';

const INSTA_SCOPE = process.env.NEXT_PUBLIC_INSTA_SCOPE
const INSTA_OAUTH_URL = process.env.NEXT_PUBLIC_INSTA_OAUTH_URL
const INSTA_CLIENT_ID = process.env.NEXT_PUBLIC_INSTA_CLIENT_ID
const INSTA_REDIRECT_URL = process.env.NEXT_PUBLIC_INSTA_REDIRECT_URL

const instaOAuthUrl = INSTA_OAUTH_URL +
  '?client_id=' + INSTA_CLIENT_ID +
  '&redirect_uri=' + INSTA_REDIRECT_URL +
  '&scope=' + INSTA_SCOPE +
  '&response_type=code';

type Props = {
  btntxt?: string
}

export const InstagramButton: React.FC<Props> = (props) => {
  const router = useRouter()

  const handleInstagramLogin = async () => {
    if (props.btntxt == 'Connect Instagram') {
      router.push(instaOAuthUrl)
    }
    else {
      const data = await safeFetch('/api/instagram', {
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
      <button className="button" onClick={handleInstagramLogin}>
        {props.btntxt}
      </button>
      <style jsx>{``}</style>
    </>
  )
}
