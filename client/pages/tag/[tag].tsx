import type { NextPage } from 'next'
import Layout from '@/components/Layout'
import Header from '@/subComponents/Header'
import Posts from "@/subComponents/Posts"

interface Props {
}

const tag: NextPage<Props> = () => {
    return (
        <Layout>
            <div className="contact pad-default">
                <Header span="you can view posts related to " header="NextJs" />
            </div>
            <div className="blog-posts pad-default-horizontal">
                <Posts />
            </div>
        </Layout>
    )
}

export default tag
