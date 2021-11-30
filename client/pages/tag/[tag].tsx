import type { NextPage } from 'next'
import Layout from '@/components/Layout'
import Header from '@/subComponents/Header'
import Posts from "@/subComponents/Posts"
import { gql } from "@apollo/client"
import client from "../api/appolo-client"

interface Props {
    tag: any,
    posts: Array<object>,
    lastThreePosts: Array<object>,
}

const tag: NextPage<Props> = ({ tag, posts, lastThreePosts }: Props) => {
    
    return (
        <Layout lastThreePosts={lastThreePosts}>
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
            tag: context.resolvedUrl.substring(5),
            posts: data.allTaggedPosts,
            lastThreePosts: data.lastNPosts
        }
    }
}

export default tag
