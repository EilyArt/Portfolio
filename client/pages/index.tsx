import type { NextPage } from 'next'
import Layout from '@/components/Layout'
import { gql } from "@apollo/client"
import client from "./api/appolo-client"

interface Props {
    lastThreePosts: Array<object>
}

const index: NextPage<Props> = ({ lastThreePosts }: Props) => {

    return (
        <Layout lastThreePosts={lastThreePosts}>
      <div className='pad-default'>
        HomePage
      </div>
    </Layout>
  )
}


export async function getServerSideProps(context: any) {

  const { data } = await client.query({
      query: gql`
    {
      lastNPosts(N: 3) {
        id
        title
        slug
        thumbnail
        createdAt
      }
    }
    `
  })

  return {
      props: {
          lastThreePosts: data.lastNPosts
      }
  }
}


export default index
