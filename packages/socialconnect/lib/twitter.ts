import {axios, stringifyParams} from 'lib'
const TWITTER_API_URL = process.env.NEXT_PUBLIC_TWITTER_API_URL
const TWITTER_CLIENT_KEY = process.env.NEXT_PUBLIC_TWITTER_CLIENT_KEY
const TWITTER_CALLBACK_URL = process.env.NEXT_PUBLIC_TWITTER_CALLBACK_URL

axios.defaults.headers.common['Content-Type'] =
  'application/x-www-form-urlencoded'

export const getAccessToken = async (code: string) => {
  try {
    const response: any = await axios.post(
      `${TWITTER_API_URL}/2/oauth2/token`,
      stringifyParams({
        code: code,
        grant_type: 'authorization_code',
        client_id: TWITTER_CLIENT_KEY,
        redirect_uri: TWITTER_CALLBACK_URL,
        code_verifier: 'challenge',
      })
    )
    return response.data
  } catch (error) {
    console.error('Twitter Oauth Error:', error)
  }
}
export const getUserInfo = async (accessToken: string) => {
  try {
    const response: any = await axios.get(`${TWITTER_API_URL}/2/users/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    return response.data
  } catch (error) {
    console.error('Get UserInfo Error:', error)
  }
}


export const followTwitter = async (accessToken: string, userId: any) => {
  try {

    const response: any = await axios.post(
      `${TWITTER_API_URL}/2/users/${userId}/following`,
      {
        "target_user_id" : "404308282",
      },
    {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
    })
    return response.data
  } catch (error) {
    console.error('Get followTwitter Error:', error.response.data)
  }
}
