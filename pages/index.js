import React , {Fragment} from 'react';
import Head from '../src/components/Organisms/head';
import Hero from "../src/components/Organisms/Hero";
import style from '../src/styles/index';


const Home = ({spotify_id}) => (
  
  <Fragment>
    <Head title="Tunelist homepage" />
    <Hero/>  

    <div className="villen">
      <div>
        welcome : {spotify_id}
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

)
Home.getInitialProps = ({ req }) => {
  console.log(req.session);
  const { spotify_id } = req.session;
  return { spotify_id };
}

export default Home
