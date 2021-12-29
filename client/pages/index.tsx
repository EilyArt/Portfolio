import type { NextPage } from 'next'
import Layout from '@/components/Layout'
import { gql } from "@apollo/client"
import client from "./api/apollo-client"

interface Props {
  lastProject: any,
  cv: Array<object>,
  pageMetas: Array<object>,
  lastThreePosts: Array<object>,
}

const index: NextPage<Props> = ({ lastProject, cv, pageMetas, lastThreePosts }: Props) => {

  return (
    <Layout cv={cv} lastThreePosts={lastThreePosts} lastProject={lastProject} pageMetas={pageMetas}>
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
      cv{
        phone
        email
        address
      }
      pageMetas(page: "") {
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
      lastProject: data.lastProject,
      cv: data.cv,
      pageMetas: data.pageMetas,
      lastThreePosts: data.lastNPosts,
    }
  }
}


export default index
