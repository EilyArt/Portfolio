import type { NextPage } from 'next'
import Layout from '@/components/Layout'
import Header from '@/subComponents/Header'
import Posts from "@/subComponents/Posts"
import { gql } from "@apollo/client"
import client from "../api/appolo-client"

interface Props {
    tag: any
}

const tag: NextPage<Props> = ({ tag }: Props) => {
    console.log(tag);
    
    return (
        <Layout>
            <div className="contact pad-default">
                <Header span="you can view posts related to " header={`#${tag.name}`} />
            </div>
            <div className="blog-posts pad-default-horizontal">
                <Posts />
            </div>
        </Layout>
    )
}

export async function getServerSideProps(context: any) {


    const { data } = await client.query({
        query: gql`
      {
        tag(name: "${context.resolvedUrl.substring(5)}") {
            name
          }
      }
      `
    })

    return {
        props: {
            tag: data.tag
        }
    }
}

export default tag
