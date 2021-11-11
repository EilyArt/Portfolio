import Layout from "@/components/Layout"
import type { NextPage } from 'next'
import Label from "@/subComponents/Label";
import StickyBar from "@/subComponents/StickyBar";

interface Props {
}


const About: NextPage<Props> = ({ children }) => {
    return (
        <Layout>
            <div className="about pad-default">
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
