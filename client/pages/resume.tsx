import type { NextPage } from 'next'
import About from "@/components/About"
import Title from '@/subComponents/Title'
import AboutSection from '@/subComponents/AboutSection';
import pin from "@/svgs/pin.svg"
import ProgressTable from '@/subComponents/ProgressTable';
import { gql } from "@apollo/client"
import client from "./api/appolo-client"

interface Props {
    lastThreePosts: Array<object>
}

const resume: NextPage<Props> = ({ lastThreePosts }: Props) => {

    return (
        <About lastThreePosts={lastThreePosts}>
            <Title title="Resume" />
            <div className="m-top-2 pad-vertical-2">
                <AboutSection src={pin} title="education"
                    records={[
                        {
                            label: "University School of the Arts",
                            date: "2007 — 2009",
                            description: "Nemo enims ipsam voluptatem, blanditiis praesentium voluptum delenit atque corrupti, quos dolores et quas molestias exceptur.",
                        },
                        {
                            label: "New York Academy of Art",
                            date: "2005 — 2007",
                            description: "Ratione voluptatem sequi nesciunt, facere quisquams facere menda ossimus, omnis voluptas assumenda est omnis..",
                        },
                        {
                            label: "High School of Art and Design",
                            date: "2003 — 2005",
                            description: "Duis aute irure dolor in reprehenderit in voluptate, quila voluptas mag odit aut fugit, sed consequuntur magni dolores eos.",
                        }
                    ]}
                />
            </div>
            <div className="m-top-2 pad-vertical-2">
                <AboutSection src={pin} title="education"
                    records={[
                        {
                            label: "University School of the Arts",
                            date: "2007 — 2009",
                            description: "Nemo enims ipsam voluptatem, blanditiis praesentium voluptum delenit atque corrupti, quos dolores et quas molestias exceptur.",
                        },
                        {
                            label: "New York Academy of Art",
                            date: "2005 — 2007",
                            description: "Ratione voluptatem sequi nesciunt, facere quisquams facere menda ossimus, omnis voluptas assumenda est omnis..",
                        },
                        {
                            label: "High School of Art and Design",
                            date: "2003 — 2005",
                            description: "Duis aute irure dolor in reprehenderit in voluptate, quila voluptas mag odit aut fugit, sed consequuntur magni dolores eos.",
                        }
                    ]}
                />
            </div>
            <div className="m-top-2 pad-vertical-2">
                <h2 className="pad-vertical-2">My Skills</h2>
                <ProgressTable />
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

export default resume
