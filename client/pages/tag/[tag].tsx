import type { NextPage } from 'next'
import Layout from '@/components/Layout'
import Header from '@/subComponents/Header'
import Posts from "@/subComponents/Posts"
import { gql } from "@apollo/client"
import client from "../api/appolo-client"

interface Props {
}

const tag: NextPage<Props> = () => {
    return (
        <Layout>
            <div className="contact pad-default">
                <Header span="you can view posts related to " header="NextJs" />
            </div>
            <div className="blog-posts pad-default-horizontal">
                <Posts />
            </div>
        </Layout>
    )
}

export async function getServerSideProps(context: any) {


    const { data } = await client.query({
        query: gql`
      {
        post(slug: "${context.resolvedUrl.substring(1)}") {
            title
            slug
            thumbnail
            description
            duration
            createdAt
            tag {
               name
            }
        }
      }
      `
    })

    return {
        props: {
            post: data.post
        }
    }
}

export default tag
