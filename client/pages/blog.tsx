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
  posts: any
}

const blog: NextPage<Props> = ({posts}: Props) => {
  // console.log(posts.allposts[0].title);

  return (
    <Layout>
      <div className="blog">
        <div className="pad-default">
          <Header span="EILYA's Thoughts, stories and ideas." header="Blog" />
        </div>
        <div className="blog-posts pad-default-horizontal">
          {posts && <Posts posts={posts.allposts} />}
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
    tag {
      name
    }
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
