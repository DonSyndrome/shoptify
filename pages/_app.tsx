import React from 'react';
import App, { Container } from 'next/app';
import Nav from '../src/components/Organisms/nav';
import Pixel from '../src/components/Organisms/Pixel';


export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Nav />
        <Component {...pageProps} />
        <Pixel />
      </Container>
    );
  }
}
