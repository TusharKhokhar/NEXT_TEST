import { useRouter } from 'next/router'
import { safeFetch } from 'fetcher'

const DISCORD_CLIENT_ID = process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID;
const DISCORD_CALLBACK_URL = process.env.NEXT_PUBLIC_DISCORD_CALLBACK_URL;
const DISCORD_SCOPE = process.env.NEXT_PUBLIC_DISCORD_SCOPE;

const discordOAuthUrl = 'https://discord.com/oauth2/authorize?client_id=' + DISCORD_CLIENT_ID +
  '&redirect_uri=' + DISCORD_CALLBACK_URL +
  '&response_type=code&scope=' + DISCORD_SCOPE;

type Props = {
  btntxt?: string
}

export const DiscordButton: React.FC<Props> = (props) => {
  const router = useRouter()

  const handleDiscordLogin = async () => {
    if (props.btntxt == 'Connect Discord') {
      router.push(discordOAuthUrl)
    }
    else {
      const data = await safeFetch('/api/discord', {
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
      <button className="button" onClick={handleDiscordLogin}>
        {props.btntxt}
      </button>
      <style jsx>{``}</style>
    </>
  )
}
