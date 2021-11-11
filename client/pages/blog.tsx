import type { NextPage } from 'next'
import Layout from '@/components/Layout'
import Image from 'next/dist/client/image';
import hero from "@/images/blog-dark.jpeg"
import Posts from '../subComponents/Posts';
import Title from '@/subComponents/Title';
import Tag from '@/subComponents/Tag';

interface Props {
}

const blog: NextPage<Props> = () => {
  return (
    <Layout>
      <div className="blog">
        <div className="blog-hero">
          <Image src={hero} objectFit="cover" layout="fill" className="blog-hero-img" />
          <div className="blog-hero-overlay" />
          <div className="blog-hero-content">
            <h1>EILYA's</h1>
            <p>Thoughts, stories and ideas.</p>
          </div>
        </div>
        <div className="blog-posts pad-default">
          <Posts />
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

export default blog
