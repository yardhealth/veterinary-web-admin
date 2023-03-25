import { BASE_URL } from 'configs'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'

export const fetcher = async (args: any) => {
  const token = localStorage.getItem('ACCESS_TOKEN')
  return fetch(args, {
    headers: { Authorization: `Bearer ${token}` },
  }).then((_) => _.json())
}

export const useGET = <T>(path: string) => {
  const url = BASE_URL
  return useSWR<{
    success: { data: T }
    message: string
  }>(`${url}/${path}`, fetcher)
}

export const useMutation = <T>(
  path: string,
  options?: { method: 'POST' | 'PUT' | 'DELETE' | 'PATCH' }
) => {
  const method = options?.method || 'POST'

  if (typeof window !== 'undefined') {
    const accessToken = window?.localStorage?.getItem('ACCESS_TOKEN')
    return useSWRMutation(
      `${BASE_URL}/${path}`,
      async (url: string, { arg }: any) =>
        fetch(url, {
          method,
          body: JSON.stringify(arg),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }).then((_) => _.json())
    )
  }
  return useSWRMutation(
    `${BASE_URL}/${path}`,
    async (url: string, { arg }: any) =>
      fetch(url, {
        method,
        body: JSON.stringify(arg),
        headers: { 'Content-Type': 'application/json' },
      }).then((_) => _.json())
  )
}
