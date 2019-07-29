import React , {Fragment} from 'react'
import Link from 'next/link'
import Head from '../components/head'
import Nav from '../components/nav'

const Home = () => (
  
  <Fragment>
    <Head title="Home" />
    <Nav />
    <div className="parallax">
      <div className="parallax__layer parallax__layer--back">
        ...
      </div>
      <div className="parallax__layer parallax__layer--base">
        <div>
        <h1 className="title">התחל עכשיו</h1>
        <button>
        <Link href="./playlist/test">
          עקוב
        </Link>
        </button>
        </div>
      </div>
    </div>

    <div className="villen">
    <div className="row">
        <Link href="https://github.com/zeit/next.js#getting-started">
          <a className="card">
            <h3>Getting Started &rarr;</h3>
            <p>Learn more about Next on Github and in their examples</p>
          </a>
        </Link>
        <Link href="https://open.segment.com/create-next-app">
          <a className="card">
            <h3>Examples &rarr;</h3>
            <p>
              Find other example boilerplates on the{' '}
              <code>create-next-app</code> site
            </p>
          </a>
        </Link>
        <Link href="https://github.com/segmentio/create-next-app">
          <a className="card">
            <h3>Create Next App &rarr;</h3>
            <p>Was this tool helpful? Let us know how we can improve it</p>
          </a>
        </Link>
      </div>
    </div>
   
      <style jsx global>{`
        html {
          overflow: hidden;
        }
        body {
          height: 100vh;
          perspective: 1px;
          transform-style: preserve-3d;
          overflow-x:hidden;
          overflow-y:auto;
        }
      `}</style>

    <style jsx>{`


      .parallax {
        width: 100vw;
        height:100vh;
      }
      .parallax__layer {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
      }
      .parallax__layer--base {
        transform: translateZ(0);
        display:flex;
        justify-content: center;
        align-items: center;
        color:white;

      }
      .parallax__layer--back {
        transform: translateZ(-0.2px)scale(2);
        background-image:url('static/home_page_bg.png');
        background-repeat: no-repeat;
        background-size: contain;
      }

      .title {
        margin: 0;
        width: 100%;
        padding-top: 80px;
        line-height: 1.15;
        font-size: 48px;
      }

      .villen {
        width: 100vw;
        height:100vh;
        background-color: hotpink;
        z-index: 2;
        position: relative;
      }

 


      .row {
        max-width: 880px;
        margin: 80px auto 40px;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
      }
      .card {
        padding: 18px 18px 24px;
        width: 220px;
        text-align: left;
        text-decoration: none;
        color: #434343;
        border: 1px solid #9b9b9b;
      }
      .card:hover {
        border-color: #067df7;
      }
      .card h3 {
        margin: 0;
        color: #067df7;
        font-size: 18px;
      }
      .card p {
        margin: 0;
        padding: 12px 0 0;
        font-size: 13px;
        color: #333;
      }
    `}</style>
  </Fragment>

)

export default Home
