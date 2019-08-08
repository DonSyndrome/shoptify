import React , {Fragment} from 'react';
import Head from '../src/components/Organisms/head';
import style from '../src/styles/index';


const Home = () => (
  <Fragment>
    <Head title="Admin Page" />
    <div className="villen">
      welcome to the admin page
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
