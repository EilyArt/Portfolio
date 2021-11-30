import About from "@/components/About"
import type { NextPage } from 'next'
import Title from '@/subComponents/Title'
import AboutSection from '@/subComponents/AboutSection';
import SkillBox from "@/subComponents/SkillBox";
import ProgressTableVertical from '../subComponents/ProgressTableVertical';
import { gql } from "@apollo/client"
import client from "./api/appolo-client"

interface Props {
    lastThreePosts: Array<object>
}

const about: NextPage<Props> = ({ lastThreePosts }: Props) => {

    return (
        <About lastThreePosts={lastThreePosts}>
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
                <h2 className="pad-vertical-2">My Skills</h2>
                <ProgressTableVertical />
            </div>
        </About>
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

export default about

