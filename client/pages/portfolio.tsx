import type { NextPage } from 'next'
import Layout from '@/components/Layout'
import Header from '@/subComponents/Header'
import Gallery from '@/subComponents/Gallery'

interface Props {
}

const portfolio: NextPage<Props> = () => {
    return (
        <Layout>
            <div className="portfolio pad-default">
                <Header span="Showcasing some of my best work" header="Portfolio" />
            </div>
            <div className="portfolio-projects pad-default-horizontal">
                {[...Array(3)].map((project, index) => {
                    return (
                        <div className="portfolio-projects-project">
                            <Gallery id={index}/>
                        </div>
                    );
                })}
            </div>
        </Layout>
    )
}

export default portfolio
