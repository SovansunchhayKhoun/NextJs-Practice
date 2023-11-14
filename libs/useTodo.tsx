'use client'

import useSWR from "swr";


export default function useTodo() {
  const fetcher = (url: string) => fetch(url).then((res) => res.json()).then(json => json.data);
  const { data, mutate, isLoading, error, isValidating } = useSWR("/api/todos", fetcher)

  return {
    isValidating,
    data,
    mutate,
    isLoading,
    error
  }
}