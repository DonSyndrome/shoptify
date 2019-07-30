import React from 'react'
import Head from 'next/head'

import App, { Container } from 'next/app'

const Nav = props => (
    <div className={'nav-bar'}>
        <Head>
            <link href={"https://fonts.googleapis.com/css?family=Roboto:100,400,700&display=swap"} rel="stylesheet"/>
        </Head>
        <span>
            Tunelist
        </span>
        <style jsx>{`
          .nav-bar {
            text-align: center;
            font-size: 2rem;
            width: 100%;
            color: white;
            background-color: black;
            opacity: .7;
            height:50px;
          }
      `}</style>
        <style jsx global>{`
          html, body {
              font-family: 'arial';
              height: 100;
              background-color: #828282;
              color: white;
          }
          * {
            box-sizing: border-box;
            font-family: 'Roboto', sans-serif;
          }
      `}</style>
    </div>
);


export default class MyApp extends App {
    render() {
        const { Component, pageProps } = this.props
        return (
            <Container>
                <Nav />
                <Component {...pageProps} />
            </Container>
                )
            }
}