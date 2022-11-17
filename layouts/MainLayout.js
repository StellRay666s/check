import Head from "next/head";
import React, { useEffect } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
export const MainLayout = ({ children, title = 'Title', charSet = 'utf-8', description = 'description', keyWords = 'keyWords', viewport = 'width=device-width, initial-scale=1' }) => {


    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name='keywords' content={keyWords} />
                <meta name='description' content={description} />
                <meta name="viewport" content={viewport} />
                <meta charSet={charSet} />
            </Head>
            <Header/>
           {!children ? <Loader
                type="Rings"
                color="#00BFFF"
                height={100}
                width={100}
                timeout={3000} //3 secs
            /> : children}
            <Footer/>
        </>
    )
}