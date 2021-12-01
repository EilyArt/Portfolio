import type { NextPage } from 'next'
import Layout from '@/components/Layout'
import { gql } from "@apollo/client"
import client from "./api/appolo-client"

interface Props {
  lastProject: any,
  lastThreePosts: Array<object>,
}

const index: NextPage<Props> = ({ lastProject, lastThreePosts }: Props) => {

  return (
    <Layout lastThreePosts={lastThreePosts} lastProject={lastProject}>
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
      lastProject {
        name
        images{
          image
          alt
        }
      }
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
      lastProject: data.lastProject[0],
      lastThreePosts: data.lastNPosts,
    }
  }
}


export default index
