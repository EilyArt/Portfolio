import { queryIndex as query } from './queries/queries'
import { useQuery } from "@apollo/client";
import Image from "next/image"
import Header from '@/subComponents/Header'
import Head from 'next/head'

const index = () => {

  const { data, loading, error } = useQuery(
    query,
    { ssr: true }
  );

  if (loading) return "Loading...";

  if (error) return `Error! ${error.message}`;

  const { cv, pageMetas, page } = data


  return (
    <>
      <Head>
        <title>{`${page?.title}`}</title>
        {pageMetas?.map((meta: any, index: number) => {
          return (
            <meta key={index} name={`${meta.name}`} content={`${meta.content}`} />
          )
        })}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Head>

      <div className='pad-default pad-bottom-0'>
        <Header span='' header="Hi, I'm EILYA" />
      </div>
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
        </div>
      </div>
    </>
  )
}

export default index
