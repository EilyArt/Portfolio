import type { NextPage } from 'next'
import Layout from '@/components/Layout'
import Header from '@/subComponents/Header'
import Posts from "@/subComponents/Posts"
import { gql } from "@apollo/client"
import client from "../api/apollo-client"

interface Props {
    tag: any,
    cv: any,
    posts: Array<object>,
    lastProject: any,
    title: string,
    lastThreePosts: Array<object>,
}

const tag: NextPage<Props> = ({ tag, cv, posts, lastProject, title, lastThreePosts }: Props) => {

    return (
        <Layout lastThreePosts={lastThreePosts} lastProject={lastProject} title={`#${title}`}>
            <div className="contact pad-default">
                <Header span="you can view posts related to " header={`#${tag}`} />
            </div>
            <div className="blog-posts pad-default-horizontal">
                <Posts posts={posts} myImage={cv}/>
            </div>
        </Layout>
    )
}

export async function getServerSideProps(context: any) {

    const { data } = await client.query({
        query: gql`
      {
        tag(name: "${context.resolvedUrl.substring(5)}") {
            id
        }
        cv{
            photo
            id
            alt
        }
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
    if (!data.tag) {
        return {
            redirect: {
                destination: '/'
            }
        }
    } else
    return {
        props: {
            tag: context.resolvedUrl.substring(5),
            cv: data.cv,
            posts: data.allTaggedPosts,
            lastProject: data.lastProject,
            title: context.resolvedUrl.substring(5),
            lastThreePosts: data.lastNPosts
        }
    }
}

export default tag
