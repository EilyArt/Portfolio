import Layout from "@/components/Layout"
import type { NextPage } from 'next'
import Label from "@/subComponents/Label";
import StickyBar from "@/subComponents/StickyBar";
import Header from "@/subComponents/Header"

interface Props {
    lastThreePosts: Array<object>,
    pageMetas: Array<object>,
    lastProject: any,
    children: any,
}


const About: NextPage<Props> = ({ lastThreePosts, lastProject, pageMetas, children }) => {
    return (
        <Layout lastThreePosts={lastThreePosts} lastProject={lastProject} pageMetas={pageMetas}>
            <div className="pad-default">
          <Header span="EILYA's Thoughts, stories and ideas." header="About" />
        </div>
            <div className="about pad-default-horizontal">
                <StickyBar />
                <div className="about-body">
                    <Label labels={["About", "resume"]} />
                    <div className="about-body-children">
                        {children}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default About
