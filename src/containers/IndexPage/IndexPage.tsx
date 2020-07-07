import React, { useEffect, useState } from 'react'
import { Button, Card, Input, Pagination } from 'antd'
import { format } from 'date-fns'
import styled from 'styled-components'
import useSWR from 'swr'

import { IResponse } from './types'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export const IndexPage = () => {
  const [page, setPage] = useState(1)
  const [inputValue, setInputValue] = useState('')

  const { data, mutate, isValidating } = useSWR<IResponse>(
    `https://api.github.com/search/repositories?q=${inputValue}&limit=10&page=${page}&per_page=4`,
    fetcher,
    {
      revalidateOnMount: false,
      revalidateOnFocus: false,
    },
  )

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    mutate()
  }

  console.log(data, isValidating, page)

  // useEffect(() => {
  //   mutate()
  // }, [page])

  return (
    <Container>
      <SearchSection onSubmit={onSubmit}>
        <Input
          placeholder="Type repository name"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          disabled={isValidating}
        />

        <Button htmlType="submit" disabled={isValidating || !inputValue.length}>
          Search
        </Button>
      </SearchSection>

      <ItemsContainer>
        <Items>
          {data && data.items && (
            <Cards>
              {data.items.map(
                ({ id, name, stargazers_count, updated_at, html_url }) => (
                  <Card key={id} title={<a href="#">{name}</a>}>
                    <CardContent>
                      <b>{`${stargazers_count} stars`}</b>
                      <div>{`Last update: ${format(
                        new Date(updated_at),
                        'd MMM yyyy',
                      )}`}</div>
                      <a href={html_url} target="_blank">
                        Ссылка на репозиторий
                      </a>
                    </CardContent>
                  </Card>
                ),
              )}
            </Cards>
          )}

          <PagintaionContaner>
            <Pagination
              current={page}
              total={50}
              onChange={(page) => {
                setPage(page)
                mutate()
              }}
            />
          </PagintaionContaner>
        </Items>
      </ItemsContainer>
    </Container>
  )
}

const Container = styled.div`
  padding: 120px 60px;
`

const SearchSection = styled.form`
  display: grid;
  grid-template-columns: 1fr min-content;
  gap: 0 8px;
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

const CardContent = styled.div`
  display: grid;
  gap: 12px 0;
`

const PagintaionContaner = styled.div`
  display: flex;
  justify-content: center;
`
