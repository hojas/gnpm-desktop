const anyToString = (obj: any) =>
  typeof obj === 'object' ? JSON.stringify(obj) : '' + obj

export interface SearchParams {
  text: string
  size?: number
  from?: number
  quality?: number
  popularity?: number
  maintenance?: number
}

const defaultSearchParams: SearchParams = {
  text: '',
  size: 10,
  from: 0,
  quality: 1.0,
  popularity: 0.0,
  maintenance: 0.0,
}

const mergeSearchParams = (params: SearchParams) => ({
  ...defaultSearchParams,
  ...params,
})

const api = (params: SearchParams) => {
  const url = new URL('/-/v1/search', 'https://registry.npmjs.com')
  Object.keys(params).forEach(key =>
    url.searchParams.append(key, anyToString(params[key as keyof SearchParams]))
  )
  return url
}

export const search = (params: SearchParams) => {
  const mergedParams = mergeSearchParams(params)
  const url = api(mergedParams)
  // @ts-ignore
  return window.__TAURI__.http.fetch(url.href)
}
