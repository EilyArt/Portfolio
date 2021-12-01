import type { NextPage } from 'next'
import About from "@/components/About"
import Title from '@/subComponents/Title'
import AboutSection from '@/subComponents/AboutSection';
import pin from "@/svgs/pin.svg"
import ProgressTable from '../subComponents/ProgressTable';
import { gql } from "@apollo/client"
import client from "./api/appolo-client"

interface Props {
    educations: Array<object>,
    experiences: Array<object>,
    languages: Array<object>,
    certificates: Array<object>,
    skillCategories: Array<object>,
    lastProject: any,
    lastThreePosts: Array<object>,
}

const resume: NextPage<Props> = ({ educations, experiences, languages, certificates, skillCategories, lastProject, lastThreePosts }: Props) => {

    return (
        <About lastThreePosts={lastThreePosts} lastProject={lastProject}>
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
                        <h2 className="pad-vertical-2">{category.title}</h2>
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
            experiences: data.experiences,
            languages: data.languages,
            certificates: data.certificates,
            skillCategories: data.skillCategories,
            lastProject: data.lastProject[0],
            lastThreePosts: data.lastNPosts,
        }
    }
}

export default resume
