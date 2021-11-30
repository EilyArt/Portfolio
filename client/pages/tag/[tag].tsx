import type { NextPage } from 'next'
import Layout from '@/components/Layout'
import Header from '@/subComponents/Header'
import Posts from "@/subComponents/Posts"
import { gql } from "@apollo/client"
import client from "../api/appolo-client"

interface Props {
    tag: any,
    posts: Array<object>
}

const tag: NextPage<Props> = ({ tag, posts }: Props) => {
    
    return (
        <Layout>
            <div className="contact pad-default">
                <Header span="you can view posts related to " header={`#${tag}`} />
            </div>
            <div className="blog-posts pad-default-horizontal">
                <Posts posts={posts}/>
            </div>
        </Layout>
    )
}

export async function getServerSideProps(context: any) {


    const { data } = await client.query({
        query: gql`
      {
        allTaggedPosts(tag: "${context.resolvedUrl.substring(5)}") {
            title
            slug
            thumbnail
            excerpt
            duration
            createdAt
            tags {
                name
            }
          }
      }
      `
    })

    return {
        props: {
            tag: context.resolvedUrl.substring(5),
            posts: data.allTaggedPosts
        }
    }
}

export default tag
