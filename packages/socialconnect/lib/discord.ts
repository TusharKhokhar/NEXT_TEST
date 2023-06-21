import { axios } from "lib"
import * as redis from "lib/redis"
import prisma from "db"

axios.defaults.headers.common["Content-Type"] = "application/json"
axios.defaults.headers.common[
  "Authorization"
] = `Bot ${process.env.DISCORD_BOTTOKEN}`

const DiscordURI = process.env.DISCORD_APIURL

const redisKey = "discord-config"

type DiscordConfigProps = {
  guildId: string
}

const getGuildId = async () => {
  const config: DiscordConfigProps = await redis.get(redisKey)
  return config.guildId
}

/** Channel apis */
export const getChannels = async () => {
  try {
    const GuildID = await getGuildId()
    const response: any = await axios.get(
      `${DiscordURI}/guilds/${GuildID}/channels`
    )
    const channels = response.data.filter(
      (channel: any) => channel.type !== 4 && channel.type !== 2
    )
    return channels
  } catch (error) {
    console.error("Error trying to getting channels", error.response.data)
    throw error.response.data
  }
}

export const getSingleChannel = async (id: any) => {
  try {
    const response = await axios.get(`${DiscordURI}/channels/${id}`)
    return response.data
  } catch (error) {
    console.error("Error trying to get single channel", error.response.data)
    throw error.response.data
  }
}

export const createChannel = async (
  name: string,
  permission: string = null
) => {
  const allow = permission === "read-only" ? "66624" : "0"
  const deny =
    permission === "read-only"
      ? "3072"
      : permission === "read-write"
      ? "0"
      : "1024"
  try {
    const { guildId: GuildID } = await redis.get(redisKey)
    const response = await axios.post(
      `${DiscordURI}/guilds/${GuildID}/channels`,
      {
        name,
        permission_overwrites: [
          {
            deny: deny,
            allow: allow,
            type: 0,
            id: GuildID,
          },
        ],
      }
    )
    return response.data
  } catch (error) {
    console.error("Error trying to create channel", error.response.data)
    throw error.response.data
  }
}

export const updateChannel = async (id: any, name: string) => {
  try {
    const response = await axios.patch(`${DiscordURI}/channels/${id}`, { name })
    return response.data
  } catch (error) {
    console.error("Error trying to update channel", error.response.data)
    throw error.response.data
  }
}

export const deleteChannel = async (id: any) => {
  try {
    const response = await axios.delete(`${DiscordURI}/channels/${id}`)
    return response.data
  } catch (error) {
    console.error("Error trying to delete channel", error.response.data)
    throw error.response.data
  }
}

export const getChannelMessage = async (channelId: any, messageId: any) => {
  try {
    const response = await axios.get(
      `${DiscordURI}/channels/${channelId}/messages/${messageId}`
    )
    return response.data
  } catch (error) {
    console.error("Error trying to get channel messages", error.response.data)
    return
  }
}

/** Role apis */
export const getRoles = async () => {
  try {
    const GuildID = await getGuildId()
    const response = await axios.get(`${DiscordURI}/guilds/${GuildID}/roles`)
    return response.data
  } catch (error) {
    console.error("Error trying to getting roles", error.response.data)
    throw error.response.data
  }
}

export const createRole = async (name: string, color: number) => {
  try {
    const GuildID = await getGuildId()
    const response = await axios.post(`${DiscordURI}/guilds/${GuildID}/roles`, {
      name,
      color,
    })
    return response.data
  } catch (error) {
    console.error("Error trying to create role", error.response.data)
    throw error.response.data
  }
}

export const assingRoleToChannel = async (channelId: any, roleId: any) => {
  try {
    const response = await axios.put(
      `${DiscordURI}/channels/${channelId}/permissions/${roleId}`,
      {
        allow: "1024",
        deny: "0",
        id: roleId,
        type: 0,
      }
    )
    return response.status
  } catch (error) {
    console.error("Error trying to assign role to channel", error.response.data)
    throw error.response.data
  }
}

export const deletePermission = async (channelId: any, permissionId: any) => {
  try {
    const response = await axios.delete(
      `${DiscordURI}/channels/${channelId}/permissions/${permissionId}`
    )
    return response.data
  } catch (error) {
    console.error("Error trying to delete permission", error.response.data)
    throw error.response.data
  }
}

export const updateRole = async (id: any, name: string, color: number) => {
  try {
    const GuildID = await getGuildId()
    const response = await axios.patch(
      `${DiscordURI}/guilds/${GuildID}/roles/${id}`,
      {
        name,
        color,
      }
    )
    return response.data
  } catch (error) {
    console.error("Error trying to update role", error.response.data)
    throw error.response.data
  }
}

export const deleteRole = async (id: any) => {
  try {
    const GuildID = await getGuildId()
    const response = await axios.delete(
      `${DiscordURI}/guilds/${GuildID}/roles/${id}`
    )
    return response.data
  } catch (error) {
    console.error("Error trying to delete role", error.response.data)
    throw error.response.data
  }
}

/** Member apis */
export const deleteMember = async (memberId: any, roleId: any) => {
  try {
    const GuildID = await getGuildId()
    const resp = await axios.delete(
      `${DiscordURI}/guilds/${GuildID}/members/${memberId}/roles/${roleId}`
    )
    return resp
  } catch (error) {
    console.error("Error trying to delete member", error.response.data)
    throw error.response.data
  }
}

export const assignMemberToRole = async (memberId: any, roleId: any) => {
  try {
    const GuildID = await getGuildId()
    const resp = await axios.put(
      `${DiscordURI}/guilds/${GuildID}/members/${memberId}/roles/${roleId}`,
      {}
    )
    return resp
  } catch (error) {
    console.error("Error trying to assign member", error.response.data)
    throw error.response.data
  }
}

/** Mapped role tokens with enjin and other blockchain tokens */
export const getMappedRoles = async (
  roles: any,
  walletTokens: any,
  walletAddress: string
) => {
  const mappedRoles = []
  for await (let role of roles) {
    const absentToken = []
    for await (let token of role.contracts) {
      if (token.blockchainType === "ETHEREUM") {
        const contract = await prisma.contract.findUnique({
          where: {
            address: token.address,
          },
          select: {
            tokens: {
              where: {
                owner: walletAddress,
              },
            },
          },
        })
        if (!contract || !contract.tokens.length) {
          absentToken.push(token)
        }
      } else {
        if (!walletTokens[token.product.tokenId]) {
          absentToken.push(token)
        }
      }
    }
    const totalContracts = role.contracts.length
    const presentContracts = totalContracts - absentToken.length
    if (presentContracts >= Number(role.contractsRequired)) {
      mappedRoles.push(role)
    }
  }
  return mappedRoles
}
