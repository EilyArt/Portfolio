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
}

const blog: NextPage<Props> = (posts) => {
  // console.log(posts.posts.allposts);

  return (
    <Layout>
      <div className="blog">
        <div className="pad-default">
          <Header span="EILYA's Thoughts, stories and ideas." header="Blog" />
        </div>
        <div className="blog-posts pad-default-horizontal">
          {posts && posts.posts && <Posts posts={posts.posts.allposts} />}
        </div>
        <div className="pad-default">
          <Title title="Explore Tags" />
          <div className="blog-tags">
            <Tag />
            <Tag />
            <Tag />
            <Tag />
            <Tag />
            <Tag />
            <Tag />
            <Tag />
            <Tag />
            <Tag />
            <Tag />
            <Tag />
            <Tag />
            <Tag />
            <Tag />
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
      allposts {
        title
        description
		    slug
        thumbnail
      }
    }
    
    `
  })

  return {
    props: {
      posts: data
    }
  }
}

export default blog
