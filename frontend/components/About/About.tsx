import Layout from "@/components/Layout/Layout";
import type { NextPage } from "next";
import Label from "@/components/Label/Label";
import StickyBar from "@/components/StickyBar/StickyBar";
import Header from "@/components/Header/Header";

interface Props {
  cv: Array<object>;
  children: any;
}

const About: NextPage<Props> = ({ cv, children }) => {
  return (
    <>
      <div className="pad-default">
        <Header span="EILYA's history and accomplishments." header="About" />
      </div>
      <div className="about pad-default-horizontal">
        <StickyBar cv={cv} />
        <div className="about-body">
          <Label labels={["About", "resume"]} />
          <div className="about-body-children">{children}</div>
        </div>
      </div>
    </>
  );
};

export default About;
