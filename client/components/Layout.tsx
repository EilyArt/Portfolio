import Footer from "./Footer"
import Navbar from "./Navbar"
import Head from 'next/head'
import { FaSortUp } from "react-icons/fa";

interface Props {
    lastThreePosts: Array<object>,
    cv: Array<object>,
    postMetas: Array<object>,
    pageMetas: Array<any>,
    lastProject: any,
    children: any,
    title: string
}

const Layout = ({ lastThreePosts, cv, lastProject, title, postMetas, pageMetas, children }: Props) => {

    // When the user scrolls down 20px from the top of the document, show the button
    if (typeof window !== "undefined") {
        window.onscroll = function () { scrollFunction() };
    }

    function scrollFunction() {
        if (typeof document !== "undefined") {
            let mybutton: any = document.getElementById("myBtn");
            if (typeof mybutton !== "undefined") {
                if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                    mybutton.style.display = "block";
                } else {
                    mybutton.style.display = "none";
                }
            }
        }
    }

    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    return (
        <div>
            <Head>
                <title>{`${title.length === 0 ? (pageMetas ? pageMetas[0].page.title : "EILYA AMIN") : title}`}</title>
                <link rel="icon" href="/favicon.ico" />
                {postMetas.map((meta: any) => {
                    return (
                        <meta name={`${meta.name}`} content={`${meta.content}`} />
                    )
                })}
                {pageMetas && pageMetas.map((meta: any, index: number) => {
                    return (
                        <meta key={index} name={`${meta.name}`} content={`${meta.content}`} />
                    )
                })}
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
            </Head>

            <Navbar />
            {children}
            <button onClick={() => scrollToTop()} className="scrollUpButton" id="myBtn" title="Go to top">
                <span>
                    <FaSortUp />
                </span>
            </button>
            <Footer lastThreePosts={lastThreePosts} lastProject={lastProject} cv={cv} />
        </div>
    )
}

Layout.defaultProps = {
    lastThreePosts: [],
    postMetas: [],
    pageMetas: [],
    lastProject: {},
    title: ""
}

export default Layout
