import About from "@/components/About"
import type { NextPage } from 'next'
import Title from '@/subComponents/Title'
import AboutSection from '@/subComponents/AboutSection';
import SkillBox from "@/subComponents/SkillBox";
import ProgressTable from '@/subComponents/ProgressTable';
import pin from "@/svgs/pin.svg"
import { gql } from "@apollo/client"
import client from "./api/appolo-client"

interface Props {
    hobbies: Array<object>,
    lastProject: any,
    pageMetas: Array<object>,
    lastThreePosts: Array<object>,
}

const about: NextPage<Props> = ({ hobbies, lastProject, pageMetas, lastThreePosts }: Props) => {

    return (
        <About lastThreePosts={lastThreePosts} lastProject={lastProject} pageMetas={pageMetas}>
            <Title title="about me" />
            <p>
                I'm Creative Director and UI/UX Designer from Sydney, Australia,
                working in web development and print media. I enjoy turning complex problems into simple,
                beautiful and intuitive designs.<br /><br />
                My job is to build your website so that it is functional
                and user-friendly but at the same time attractive. Moreover,
                I add personal touch to your product and make sure that is eye-catching and easy to use.
                My aim is to bring across your message and identity in the most creative way.
                I created web design for many famous brand companies.
            </p>
            <div className="m-top-2 pad-vertical-2">
                <h2 className="pad-vertical-2">What I'm Doing</h2>
                <SkillBox />
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

export async function getServerSideProps(context: any) {

    const { data } = await client.query({
        query: gql`
      {
        hobbies {
            name
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
            hobbies: data.hobbies,
            lastProject: data.lastProject[0],
            pageMetas: data.pageMetas,
            lastThreePosts: data.lastNPosts
        }
    }
}

export default about

