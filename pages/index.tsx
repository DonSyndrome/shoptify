
import React, { Fragment } from 'react';
import Head from '../src/components/Organisms/head';
import Hero from '../src/components/Organisms/Hero';
import style from '../src/styles/index';
import { MyNextPage } from '../next-env';

interface HomeProps {
  spotifyId: String
};

const Home: MyNextPage = ({ spotifyId }: HomeProps) => (
  <Fragment>
    <Head title="Tunelist homepage" />
    <Hero/>
    <div className="villen">
      <div>
        {spotifyId &&
          `welcome : ${spotifyId}`
        }
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

let conditionalDataProvider = null;
if (process.browser) {
	conditionalDataProvider = async (ctx) => {	
		// let res = await fetch('http://127.0.0.1:3000/api/country');
		// let countries = await res.json();
		return {};
	}
} else {
	conditionalDataProvider = async (ctx) => {	
    const { spotifyId } = ctx.req.session;
    return { spotifyId };  
	}
}
Home.getInitialProps = async (ctx) => {
  let props = await conditionalDataProvider(ctx);
  return props;
};

export const config = { amp: 'hybrid' };
export default Home;
