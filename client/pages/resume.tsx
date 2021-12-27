import type { NextPage } from 'next'
import About from "@/components/About"
import Title from '@/subComponents/Title'
import AboutSection from '@/subComponents/AboutSection';
import pin from "@/svgs/pin.svg"
import ProgressTable from '../subComponents/ProgressTable';
import { gql } from "@apollo/client"
import client from "./api/apollo-client"

interface Props {
    educations: Array<object>,
    cv: Array<object>,
    experiences: Array<object>,
    languages: Array<object>,
    certificates: Array<object>,
    skillCategories: Array<object>,
    lastProject: any,
    pageMetas: Array<object>,
    lastThreePosts: Array<object>,
}

const resume: NextPage<Props> = ({ educations, cv, experiences, languages, certificates, skillCategories, lastProject, pageMetas, lastThreePosts }: Props) => {

    return (
        <About cv={cv} lastThreePosts={lastThreePosts} lastProject={lastProject} pageMetas={pageMetas}>
            <Title title="Resume" />
            <div className="m-top-2 pad-vertical-2">
                <AboutSection src={pin} title="EDUCATION"
                    records={
                        educations.map((education: any) => {
                            return {
                                label: `${education.title} at ${education.institution}`,
                                date: `${new Date(education.startDate).toDateString()} - ${new Date(education.endDate).toDateString()}`,
                                description: `${education.description}`,
                            }
                        })
                    }
                />
            </div>
            <div className="m-top-2 pad-vertical-2">
                <AboutSection src={pin} title="EXPERIENCE"
                    records={
                        experiences.map((experience: any) => {
                            return {
                                label: `${experience.job} at ${experience.company}`,
                                date: `${new Date(experience.startDate).toDateString()} - ${new Date(experience.endDate).toDateString()}`,
                                description: `${experience.description}`,
                            }

                        })
                    }
                />
            </div>
            {skillCategories.map((category: any) => {
                return (
                    <div className="m-top-2 pad-vertical-2">
                        <h4 className="pad-vertical-2">{category.title}</h4>
                        <ProgressTable skills={category.skillSet} />
                    </div>
                )
            })}
            <div className="m-top-2 pad-vertical-2">
                <AboutSection src={pin} title="LANGUAGES"
                    records={
                        languages.map((language: any) => {
                            return {
                                label: `${language.language}`,
                                date: `${language.level}`,
                            }

                        })
                    }
                />
            </div>
            <div className="m-top-2 pad-vertical-2">
                <AboutSection src={pin} title="CERTIFICATES"
                    records={
                        certificates.map((certificate: any) => {
                            return {
                                label: `${certificate.title}`,
                                date: `${new Date(certificate.date).toDateString()}`,
                            }

                        })
                    }
                />
            </div>
        </About>
    )
}

export async function getServerSideProps(context: any) {

    const { data } = await client.query({
        query: gql`
      {
        educations {
            institution
              title
            startDate
            endDate
            description
        }
        cv{
            photo
            CV
            id
            alt
        }
        experiences{
            job
            company
            startDate
            endDate
            description
        }
        languages{
            language
            level
        }
        certificates{
            title
            date
        }
        skillCategories {
            title
            skillSet {
              id
              title
              logo
              percentage
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
            educations: data.educations,
            cv: data.cv,
            experiences: data.experiences,
            languages: data.languages,
            certificates: data.certificates,
            skillCategories: data.skillCategories,
            lastProject: data.lastProject,
            pageMetas: data.pageMetas,
            lastThreePosts: data.lastNPosts,
        }
    }
}

export default resume
