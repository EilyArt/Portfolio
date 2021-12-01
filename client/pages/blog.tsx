import type { NextPage } from 'next'
import Layout from '@/components/Layout'
import Image from 'next/dist/client/image';
import hero from "@/images/blog-dark.jpeg"
import Posts from '../subComponents/Posts';
import Title from '@/subComponents/Title';
import Tag from '@/subComponents/Tag';
import Header from '@/subComponents/Header'
import { gql } from "@apollo/client"
import client from "./api/appolo-client"

interface Props {
  posts: Array<object>,
  tags: Array<object>,
  lastProject: any,
  lastThreePosts: Array<object>
}

const blog: NextPage<Props> = ({ posts, tags, lastProject, lastThreePosts }: Props) => {

  return (
    <Layout lastThreePosts={lastThreePosts} lastProject={lastProject}>
      <div className="blog">
        <div className="pad-default">
          <Header span="EILYA's Thoughts, stories and ideas." header="Blog" />
        </div>
        <div className="blog-posts pad-default-horizontal">
          {posts && <Posts posts={posts} />}
        </div>
        <div className="pad-default">
          <Title title="Explore Tags" />
          <div className="blog-tags">
            {tags.slice(0, 30).map((tag: any) => {
              return (
                <Tag name={tag.name} />
              )
            })}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export async function getServerSideProps() {

  const { data } = await client.query({
    query: gql`
    {
      allPosts {
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
      allTags {
        name
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

  return {
    props: {
      posts: data.allPosts,
      tags: data.allTags,
      lastProject: data.lastProject[0],
      lastThreePosts: data.lastNPosts
    }
  }
}

export default blog
