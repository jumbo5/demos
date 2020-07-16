import React, { useEffect, useState } from 'react'
import { useDebounce } from '@hooks'
import { fetcher } from '@utils'
import { Input, Pagination } from 'antd'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { parse, stringify } from 'qs'
import styled from 'styled-components'
import useSWR from 'swr'

import { Card, SkeletonCard } from './Card'
import { IResponse } from './types'

const perPage = 4
const skeletonsIds = new Array(perPage).fill(null).map((_, index) => index)

export const GithubSearchPage = () => {
  const router = useRouter()
  const query = parse(router.asPath.slice(2, router.asPath.length))

  const [page, setPage] = useState(Number(query.page) || 1)
  const [inputValue, setInputValue] = useState(
    (query.debouncedValue as string) || '',
  )

  const debouncedValue = useDebounce(inputValue, 500)

  const { data, mutate, isValidating } = useSWR<IResponse>(
    () =>
      debouncedValue
        ? `https://api.github.com/search/repositories?q=${debouncedValue}&page=${page}&per_page=${perPage}`
        : null,
    fetcher,
    {
      revalidateOnFocus: false,
    },
  )

  useEffect(() => {
    const query = stringify({ page, debouncedValue })

    router.push(`${router.pathname}?${query}`)
  }, [page, debouncedValue])

  return (
    <>
      <NextSeo
        title="Github search"
        description="React Github search example"
      />

      <Input
        placeholder="Type repository name"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        disabled={isValidating}
      />

      <ItemsContainer>
        <Items>
          {data && data.items && (
            <Cards>
              {data.items.map((item) => (
                <Card key={item.id} {...item} />
              ))}
            </Cards>
          )}

          {isValidating && (
            <Cards>
              {skeletonsIds.map((id) => (
                <SkeletonCard key={id} />
              ))}
            </Cards>
          )}

          {(data || isValidating) && (
            <PagintaionContaner>
              <Pagination
                current={page}
                total={
                  data && Math.ceil(data.total_count / perPage) < 5
                    ? Math.ceil(data.total_count / perPage) * 10
                    : 50
                }
                onChange={(page) => {
                  setPage(page)
                  mutate()
                }}
              />
            </PagintaionContaner>
          )}
        </Items>
      </ItemsContainer>
    </>
  )
}

const Container = styled.div`
  padding: 120px 60px;
`

const ItemsContainer = styled.div`
  margin-top: 80px;
`
const Items = styled.div`
  width: 100%;
  display: grid;
  align-items: center;
  gap: 40px 0;
`

const Cards = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`

const PagintaionContaner = styled.div`
  display: flex;
  justify-content: center;
`
