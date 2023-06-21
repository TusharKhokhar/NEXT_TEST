// https://kentcdodds.com/blog/replace-axios-with-a-simple-custom-fetch-wrapper/
// https://swr.vercel.app/docs/error-handling
import { signOut } from "next-auth/react"
import { ConfigWithBody, ErrorWithInfo } from "./types"

export default function fetcher(
  endpoint: string,
  customConfig: ConfigWithBody = {}
) {
  const { body, form, ...configWithoutBody } = customConfig
  const headers: RequestInit["headers"] = form
    ? {}
    : {
        "content-type": "application/json",
      }
  const config: RequestInit = {
    ...configWithoutBody,
    method: configWithoutBody.method || (body || form ? "POST" : "GET"),
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  }
  if (body) {
    config.body = JSON.stringify(body)
  } else if (form) {
    config.body = form
  }

  return window.fetch(endpoint, config).then(async (res) => {
    if (res.status === 401) {
      signOut()
      if (typeof window !== undefined) {
        location.href = "/"
      }
      return
    }
    if (res.ok) {
      return await res.json()
    }

    // If the status code is not in the range 200-299,
    // we still try to parse and throw it.
    const error: ErrorWithInfo = new Error(
      "An error occurred while fetching the data."
    )
    // Attach extra info to the error object.
    error.info = await res.json()
    error.status = res.status
    throw error
  })
}

export const safeFetch = (endpoint: string, customConfig: ConfigWithBody) =>
  fetcher(endpoint, customConfig).catch((error) => ({ error }))
