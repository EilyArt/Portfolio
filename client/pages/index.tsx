import type { NextPage } from 'next'
import Layout from '@/components/Layout'
import { gql } from "@apollo/client"
import client from "./api/appolo-client"

interface Props {
  lastProject: any,
  pageMetas: Array<object>,
  lastThreePosts: Array<object>,
}

const index: NextPage<Props> = ({ lastProject, pageMetas, lastThreePosts }: Props) => {

  return (
    <Layout lastThreePosts={lastThreePosts} lastProject={lastProject} pageMetas={pageMetas}>
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
      pageMetas(page: "index") {
        page{
          title
        }
        name
        content
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
      pageMetas: data.pageMetas,
      lastThreePosts: data.lastNPosts,
    }
  }
}


export default index
