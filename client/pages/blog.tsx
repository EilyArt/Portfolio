import type { NextPage } from 'next'
import Layout from '@/components/Layout'
import Image from 'next/dist/client/image';
import hero from "@/images/blog-dark.jpeg"
import Posts from '../subComponents/Posts';
import Title from '@/subComponents/Title';
import Tag from '@/subComponents/Tag';
import Header from '@/subComponents/Header'
import { gql } from "@apollo/client"
import client from "./api/apollo-client"

interface Props {
  posts: Array<object>,
  cv: any,
  tags: Array<object>,
  lastProject: any,
  pageMetas: Array<object>,
  lastThreePosts: Array<object>,
}

const blog: NextPage<Props> = ({ posts, cv, tags, lastProject, pageMetas, lastThreePosts }: Props) => {

  return (
    <Layout cv={cv} lastThreePosts={lastThreePosts} lastProject={lastProject} pageMetas={pageMetas}>
      <div className="blog">
        <div className="pad-default">
          <Header span="EILYA's Thoughts, stories and ideas." header="Blog" />
        </div>
        <div className="blog-posts pad-default-horizontal">
          {posts && <Posts posts={posts} myImage={cv}/>}
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

export async function getServerSideProps(context: any) {

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
      cv{
        photo
        id
        alt
        email
        phone
        address
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
      pageMetas(page: "${context.resolvedUrl.substring(1)}") {
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
      posts: data.allPosts,
      cv: data.cv,
      tags: data.allTags,
      lastProject: data.lastProject,
      pageMetas: data.pageMetas,
      lastThreePosts: data.lastNPosts
    }
  }
}

export default blog
