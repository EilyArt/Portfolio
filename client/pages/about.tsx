import About from "@/components/About"
import type { NextPage } from 'next'
import Title from '@/subComponents/Title'
import AboutSection from '@/subComponents/AboutSection';
import SkillBox from "@/subComponents/SkillBox";
import pin from "@/svgs/pin.svg"
import { queryAbout as query } from './queries/queries'
import { useQuery } from "@apollo/client";
import Head from 'next/head'


const about = () => {

    const { data, loading, error } = useQuery(
        query
    );

    if (loading) return "Loading...";

    if (error) return `Error! ${error.message}`;

    const { page, jobs, cv, hobbies, pageMetas } = data


    return (
        <About cv={cv}>
            <Head>
                <title>{`${page?.title}`}</title>
                {pageMetas?.map((meta: any, index: number) => {
                    return (
                        <meta key={index} name={`${meta.name}`} content={`${meta.content}`} />
                    )
                })}
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
            </Head>
            <Title title="about me" />
            <p>
                {cv.aboutMe}
                {/* I'm Creative Director and UI/UX Designer from Sydney, Australia,
                working in web development and print media. I enjoy turning complex problems into simple,
                beautiful and intuitive designs.<br /><br />
                My job is to build your website so that it is functional
                and user-friendly but at the same time attractive. Moreover,
                I add personal touch to your product and make sure that is eye-catching and easy to use.
                My aim is to bring across your message and identity in the most creative way.
                I created web design for many famous brand companies. */}
            </p>
            <div className="m-top-2 pad-vertical-2">
                <h3 className="pad-vertical-2">What I'm Doing</h3>
                <SkillBox jobs={jobs} />
            </div>
            <div className="m-top-2 pad-vertical-2">
                <AboutSection src={pin} title="HOBBIES"
                    records={
                        hobbies.map((hobby: any) => {
                            return {
                                label: `${hobby.name}`
                            }

                        })
                    }
                />
            </div>
        </About>
    )
}

export default about

