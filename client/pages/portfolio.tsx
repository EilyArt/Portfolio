import type { NextPage } from 'next'
import Layout from '@/components/Layout'
import Header from '@/subComponents/Header'

interface Props {
}

const portfolio: NextPage<Props> = () => {
    return (
        <Layout>
            <div className="portfolio pad-default">
                <Header span="Showcasing some of my best work" header="Portfolio"/>
            </div>
        </Layout>
    )
}

export default portfolio
