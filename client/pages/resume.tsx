import type { NextPage } from 'next'
import About from "@/components/About"
import Title from '@/subComponents/Title'
import AboutSection from '@/subComponents/AboutSection';
import pin from "@/svgs/pin.svg"
import ProgressTable from '../subComponents/ProgressTable';
import { queryResume as query } from './queries/queries'
import { useQuery } from "@apollo/client";
import Head from 'next/head'


const resume = () => {

    const { data, loading, error } = useQuery(
        query
    );

    if (loading) return "Loading...";

    if (error) return `Error! ${error.message}`;

    const { page, cv, languages, pageMetas, certificates, skillCategories, educations, experiences } = data

    return (
        <About cv={cv} >
            <Head>
                <title>{`${page?.title}`}</title>
                {pageMetas?.map((meta: any, index: number) => {
                    return (
                        <meta key={index} name={`${meta.name}`} content={`${meta.content}`} />
                    )
                })}
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
            </Head>
            <Title title="Resume" />
            <div className="m-top-2 pad-vertical-2">
                <AboutSection src={pin} title="EDUCATION"
                    records={
                        educations?.map((education: any) => {
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
                        experiences?.map((experience: any) => {
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


export default resume
