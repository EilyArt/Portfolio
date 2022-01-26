import type { NextPage } from 'next'
import Layout from '@/components/Layout'
import { gql } from "@apollo/client"
import client from "./api/apollo-client"
import Image from "next/image"

interface Props {
  lastProject: any,
  cv: any,
  pageMetas: Array<object>,
  lastThreePosts: Array<object>,
}

const index: NextPage<Props> = ({ lastProject, cv, pageMetas, lastThreePosts }: Props) => {
  console.log(cv);

  return (
    <Layout cv={cv} lastThreePosts={lastThreePosts} lastProject={lastProject} pageMetas={pageMetas}>
      <div className='pad-default homepage'>
        <div className='homepage-img'>
          <div className='homepage-img-container'>
            {cv && <Image
              loader={() => `${process.env.NEXT_PUBLIC_API}media/${cv.homepagePhoto}`}
              src={`${process.env.NEXT_PUBLIC_API}media/${cv.homepagePhoto}`}
              alt={cv.alt}
              id={cv.id}
              layout="fill"
              objectFit='cover'
            />}
          </div>
        </div>
        <div className='homepage-story'>

          <div className="post-content-excerpt-description" dangerouslySetInnerHTML={{ __html: cv.homepageParagraph }} />

          {/* Hi, I'm Sarah.

          Building startups and teams, currently based in 📍Hong Kong via San Francisco, New York City, London, and Chicago. Alumna of Columbia University and Oxford University.

          Intrigued by design, traveling, photography, classical music, strategy, writing, art, armchair philosophy, fabulous food, and even better conversations.

          Seeking to be inspired, to envision the unlikely, to work hard for things that are worth it, and to be surrounded by those who bring out the best in me.

          Say hi on Twitter @sarahlichang */}
        </div>
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
        homepagePhoto
        alt
        homepageParagraph
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
