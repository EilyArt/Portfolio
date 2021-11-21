import type { NextPage } from 'next'
import Layout from '@/components/Layout'
import Header from '@/subComponents/Header'

interface Props {
}

const contact: NextPage<Props> = () => {
    return (
        <Layout>
            <div className="contact pad-default">
                <Header span="Showcasing some of my best work" header="Contact"/>
            </div>
        </Layout>
    )
}

export default contact
