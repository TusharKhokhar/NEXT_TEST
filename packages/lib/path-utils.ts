import qs from 'qs'

export const createURL = (state: any) => `?${qs.stringify(state)}`

export const pathToSearchState = (path: string) =>
  path.includes('?') ? qs.parse(path.substring(path.indexOf('?') + 1)) : {}

export const searchStateToURL = (location: Location, searchState: any) =>
  searchState ? `${location.pathname}?${qs.stringify(searchState)}` : ''

export const stringifyParams = (a: any) => qs.stringify(a)