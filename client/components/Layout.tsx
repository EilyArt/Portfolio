import Footer from "./Footer"
import Navbar from "./Navbar"
import Head from 'next/head'

interface Props {
    lastThreePosts: Array<object>,
    postMetas: Array<object>,
    lastProject: any,
    children: any,
    title: string
}

const Layout = ({ lastThreePosts, lastProject, title, postMetas, children }: Props) => {
    console.log(postMetas);
    
    return (
        <div>
            <Head>
                <title>{`${title}`}</title>
                <link rel="icon" href="/favicon.ico" />
                {postMetas.map((meta: any) => {
                    return (
                        <meta name={`${meta.name}`} content={`${meta.content}`} />
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
    lastProject: {},
    title: ""
}

export default Layout
