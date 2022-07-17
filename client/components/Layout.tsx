import Footer from "./Footer"
import Navbar from "./Navbar"
import Head from 'next/head'
import { FaSortUp } from "react-icons/fa";
import React, { ReactChildren, ReactChild } from 'react';

interface Props {
    children: ReactChild | ReactChildren;
}

const Layout = ({ children }: Props) => {

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
        <>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
            </Head>
            <Navbar />
            {children}
            <button onClick={() => scrollToTop()} className="scrollUpButton" id="myBtn" title="Go to top">
                <span>
                    <FaSortUp />
                </span>
            </button>
            <Footer />
        </>
    )
}


export default Layout
