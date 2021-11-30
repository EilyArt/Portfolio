import type { NextPage } from 'next'
import Layout from '@/components/Layout'
import Header from '@/subComponents/Header'
import Gallery from '@/subComponents/Gallery'
import { FaExternalLinkAlt } from "react-icons/fa";
import { gql } from "@apollo/client"
import client from "./api/appolo-client"

interface Props {
    lastThreePosts: Array<object>
}

const portfolio: NextPage<Props> = ({ lastThreePosts }: Props) => {

    return (
        <Layout lastThreePosts={lastThreePosts}>
            <div className="portfolio pad-default">
                <Header span="Showcasing some of my best work" header="Portfolio" />
            </div>
            <div className="portfolio pad-default-horizontal">
                {[...Array(8)].map((project, index) => {
                    return (
                        <div className="portfolio-project">
                            <Gallery id={index} />
                            <div className="portfolio-project-info">
                                <dl className="portfolio-project-info-container">
                                    <dt className="portfolio-project-info-container-dt"><h4>Project Name:</h4></dt>
                                    <dd className="portfolio-project-info-container-dd">Elithair</dd>
                                    <dt className="portfolio-project-info-container-dt"><h4>Price:</h4></dt>
                                    <dd className="portfolio-project-info-container-dd">1399$</dd>
                                    <dt className="portfolio-project-info-container-dt"><h4>Label:</h4></dt>
                                    <dd className="portfolio-project-info-container-dd">For Sell</dd>
                                    <dt className="portfolio-project-info-container-dt"><h4>Project Link:</h4> <dd className="portfolio-project-info-container-dd">
                                        <a href='/contact' target="_blank">
                                            Open <FaExternalLinkAlt />
                                        </a>
                                    </dd></dt>
                                </dl>
                                <div className="portfolio-project-info-container">
                                    <dt className="portfolio-project-info-container-dt"><h4>Features:</h4></dt>
                                    <ul>
                                        <li className="portfolio-project-info-container-li">SEO Friendly</li>
                                        <li className="portfolio-project-info-container-li">Admin Dashboard</li>
                                        <li className="portfolio-project-info-container-li">Auto Posting</li>
                                        <li className="portfolio-project-info-container-li">Email Service</li>
                                        <li className="portfolio-project-info-container-li">Security</li>
                                        <li className="portfolio-project-info-container-li">Great Design</li>
                                    </ul>
                                </div>
                                <dl className="portfolio-project-info-container" id='project-description'>
                                    <dt className="portfolio-project-info-container-dt"><h4>Short Description:</h4></dt>
                                    <p className="portfolio-project-info-container-p">Praesent dapibus, neque id cursus faucibus, tortor neque egestas auguae, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus.</p>
                                </dl>
                            </div>
                        </div>
                    );
                })}
            </div>
        </Layout>
    )
}

export async function getServerSideProps(context: any) {

    const { data } = await client.query({
        query: gql`
      {
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
            lastThreePosts: data.lastNPosts
        }
    }
}

export default portfolio
