
import React, { Fragment } from 'react';
import { NextPage, NextPageContext } from 'next'
import Head from '../src/components/Organisms/head';
import Hero from '../src/components/Organisms/Hero';
import style from '../src/styles/index';
import { MyNextPage } from '../next-env';

interface HomeProps {
  spotifyId: String
}

const Home:MyNextPage = ({ spotifyId }:HomeProps) => (
  <Fragment>
    <Head title="Tunelist homepage" />
    <Hero />
    <div className="villen">
      <div>
          {`welcome : ${spotifyId}`}
      </div>
    </div>
    <style jsx>{`
.villen {
  ${style.mixins.heroMinHeight}
  background-color: hotpink;
  z-index: 2;
  position: relative;
}
  `}</style>
  </Fragment>
);

Home.getInitialProps = async ({ req }) => {
  console.log(req.session);
  const { spotifyId } = req.session;
  // const spotifyId  = await '123456';
  return { spotifyId };
};

export default Home;
