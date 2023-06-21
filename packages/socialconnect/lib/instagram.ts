import {axios, stringifyParams} from 'lib'

const INSTA_CLIENT_ID = process.env.NEXT_PUBLIC_INSTA_CLIENT_ID
const INSTA_REDIRECT_URL = process.env.NEXT_PUBLIC_INSTA_REDIRECT_URL
const INSTA_CLIENT_SECRET = process.env.NEXT_PUBLIC_INSTA_CLIENT_SECRET

axios.defaults.headers.common['Content-Type'] =
  'application/x-www-form-urlencoded'

export const getAccessToken = async (code: string) => {
  try {
    const response: any = await axios.post(
      `https://api.instagram.com/oauth/access_token`,
      stringifyParams({
        code: code,
        grant_type: 'authorization_code',
        client_id: INSTA_CLIENT_ID,
        client_secret: INSTA_CLIENT_SECRET,
        redirect_uri: INSTA_REDIRECT_URL
      })
    )
    return response.data
  } catch (error) {
    console.error('Instagram Oauth Error:', error)
  }
}
export const getUserInfo = async (accessToken: string) => {
  try {
    const response: any = await axios.get(`https://graph.instagram.com/me?fields=id,username`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    return response.data
  } catch (error) {
    console.error('Get UserInfo Error:', error)
  }
}

