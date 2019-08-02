import React , {Fragment} from 'react';
import Head from '../src/components/head';
import Hero from "../src/components/Hero";
import style from '../src/styles/index';


const Home = () => (
  
  <Fragment>
    <Head title="Tunelist homepage" />
    <Hero/>  

    <div className="villen">
      <div>
        
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

export default Home
