import Header from '@/subComponents/Header'
import Posts from "@/subComponents/Posts"
import { queryTag as query } from '../queries/queries'
import { useQuery } from "@apollo/client";
import Head from 'next/head'
import { useRouter } from 'next/router';

const tag = () => {

    const router = useRouter()

    const { data, loading, error } = useQuery(
        query, {
            variables: {
                tag: router?.query?.tag
            }
        }
    );

    if (loading) return "Loading...";

    if (error) return `Error! ${error.message}`;

    const { page, allTaggedPosts, cv, pageMetas, tag } = data

    console.log(data);

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
            <div className="pad-default">
                <Header span="you can view posts related to " header={`#${tag.name}`} />
            </div>
            <div className="blog-posts pad-default-horizontal">
                <Posts posts={allTaggedPosts} myImage={cv} />
            </div>
        </>
    )
}

export default tag
