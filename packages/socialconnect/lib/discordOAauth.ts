import { axios, stringifyParams } from "lib";

// OAUTH
const DISCORD_CLIENT_ID = process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID;
const DISCORD_CALLBACK_URL = process.env.NEXT_PUBLIC_DISCORD_CALLBACK_URL;
const DISCORD_CLIENT_SECRET = process.env.NEXT_PUBLIC_DISCORD_CLIENT_SECRET;
const DISCORD_APIURL = process.env.NEXT_PUBLIC_DISCORD_APIURL;
const DISCORD_GUILDID = process.env.NEXT_PUBLIC_DISCORD_GUILDID;
const DISCORD_BOTTOKEN = process.env.NEXT_PUBLIC_DISCORD_BOTTOKEN;

const SCOPE = "identify guilds.join";

axios.defaults.headers.common["Content-Type"] =
  "application/x-www-form-urlencoded";

export const getAccessToken = async (code: string) => {
  try {
    let bodyData = {
      code: code,
      grant_type: "authorization_code",
      client_id: DISCORD_CLIENT_ID,
      redirect_uri: DISCORD_CALLBACK_URL,
      client_secret: DISCORD_CLIENT_SECRET,
    };
    const response: any = await axios.post(
      `${DISCORD_APIURL}/oauth2/token`,
      stringifyParams(bodyData)
    );
    return response.data;
  } catch (error) {
    console.error("Discord Oauth Error:", error);
  }
};

export const getUserInfo = async (accessToken: string) => {
  try {
    const response: any = await axios.get(`${DISCORD_APIURL}/users/@me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Discord Oauth Error:", error.response?.data);
  }
};

export const addUserToServer = async (accessToken: string, userId: any) => {
  try {
    let bodyData = {
      access_token: accessToken,
    };
    const response: any = await axios.put(
      `${DISCORD_APIURL}/guilds/${DISCORD_GUILDID}/members/${userId}`,
      bodyData,
      {
        headers: {
          Authorization: `Bot ${DISCORD_BOTTOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Discord Server Join Error:", error.response?.data);
  }
};
