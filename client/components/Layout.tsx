import Footer from "./Footer"
import Navbar from "./Navbar"
import Head from 'next/head'

interface Props {
    lastThreePosts: Array<object>,
    postMetas: Array<object>,
    pageMetas: Array<any>,
    lastProject: any,
    children: any,
    title: string
}

const Layout = ({ lastThreePosts, lastProject, title, postMetas, pageMetas, children }: Props) => {
    console.log(pageMetas);
    
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
            </Head>

            <Navbar />
            {children}
            <Footer lastThreePosts={lastThreePosts} lastProject={lastProject}/>
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
