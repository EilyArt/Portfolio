import type { NextPage } from 'next'
import Layout from '@/components/Layout'
import Header from '@/subComponents/Header'
import Gallery from '@/subComponents/Gallery'
import { FaExternalLinkAlt } from "react-icons/fa";
import { gql } from "@apollo/client"
import client from "./api/appolo-client"

interface Props {
    projects: Array<object>,
    lastProject: any,
    pageMetas: Array<object>,
    lastThreePosts: Array<object>,
}

const portfolio: NextPage<Props> = ({ projects, lastProject, pageMetas, lastThreePosts }: Props) => {

    return (
        <Layout lastThreePosts={lastThreePosts} lastProject={lastProject} pageMetas={pageMetas}>
            <div className="portfolio pad-default">
                <Header span="Showcasing some of my best work" header="Portfolio" />
            </div>
            <div className="portfolio pad-default-horizontal">
                {projects.map((project: any, index: number) => {
                    return (
                        <div className="portfolio-project">
                            <Gallery id={index} images={project.images} />
                            <div className="portfolio-project-info">
                                <dl className="portfolio-project-info-container">
                                    <dt className="portfolio-project-info-container-dt"><h4>Project Name:</h4></dt>
                                    <dd className="portfolio-project-info-container-dd">{project.name}</dd>
                                    <dt className="portfolio-project-info-container-dt"><h4>Price:</h4></dt>
                                    <dd className="portfolio-project-info-container-dd">{project.price}$</dd>
                                    <dt className="portfolio-project-info-container-dt"><h4>Label:</h4></dt>
                                    <dd className="portfolio-project-info-container-dd">{project.label}</dd>
                                    <dt className="portfolio-project-info-container-dt"><h4>Project Link:</h4> <dd className="portfolio-project-info-container-dd">
                                        <a href={`http://${project.link}`} target="_blank">
                                            Open <FaExternalLinkAlt />
                                        </a>
                                    </dd></dt>
                                </dl>
                                <div className="portfolio-project-info-container">
                                    <dt className="portfolio-project-info-container-dt"><h4>Features:</h4></dt>
                                    <ul>
                                        {project.features.map((feature: any, index: number) => {
                                            return (
                                                <li key={index} className="portfolio-project-info-container-li">{feature.feature}</li>
                                            )
                                        })}
                                    </ul>
                                </div>
                                <dl className="portfolio-project-info-container" id='project-description'>
                                    <dt className="portfolio-project-info-container-dt"><h4>Description:</h4></dt>
                                    <p className="portfolio-project-info-container-p">{project.description}</p>
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
        allProjects {
            name
            price
            label
            link
            description
            features {
              feature
            }
            images {
              image
              alt
            }
        }
        lastProject {
            name
            images{
              image
              alt
            }
        }
        pageMetas(page: "${context.resolvedUrl.substring(1)}") {
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
            projects: data.allProjects,
            lastProject: data.lastProject[0],
            pageMetas: data.pageMetas,
            lastThreePosts: data.lastNPosts,
        }
    }
}

export default portfolio
