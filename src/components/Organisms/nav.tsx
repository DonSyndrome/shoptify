import React,  {Fragment } from 'react'
import Link from 'next/link'
import Head from 'next/head'


const Nav = () => (
  <Fragment>
    <amp-sidebar id="sidebar1" layout="nodisplay" side="right">
      <ul>
        <li>Nav item 1</li>
        <li><a href="#idTwo" on="tap:idTwo.scrollTo">Nav item 2</a></li>
        <li>Nav item 3</li>
        <li><a href="#idFour" on="tap:idFour.scrollTo">Nav item 4</a></li>
        <li>Nav item 5</li>
        <li>Nav item 6</li>
      </ul>
    </amp-sidebar>
    <div className={'nav-bar'}>
      <Head>
        <link href={"https://fonts.googleapis.com/css?family=Roboto:100,400,700&display=swap"} rel="stylesheet" />
        <script async custom-element="amp-sidebar" src="https://cdn.ampproject.org/v0/amp-sidebar-0.1.js"></script>
      </Head>
      <span>
        <Link href='/'>
          <a>
            Tunelist
            </a>
        </Link>
        <button on='tap:sidebar1'>Open</button>
      </span>
      <style jsx>{`
          .nav-bar {
            text-align: center;
            font-size: 2rem;
            width: 100%;
            color: white;
            background-color: black;
            height:50px;
            position: sticky;
            top:0;
            z-index: 5;
          }
          a{
            color: white;
          }
          :global(html),:global(body) {
            margin:0;
          }
          :global(*) {
            box-sizing: border-box;
            font-family: 'Roboto', sans-serif;
          }
      `}</style>
    </div>
  </Fragment>
)

export default Nav


// import Link from 'next/link';
// const links : {href:string,label:string}[] = [
//   { href: '/404', label: 'כשרונות צעירים' },
//   { href: '/404', label: 'מצעד' },
//   { href: '/', label: 'בית' },
// ];
// <nav>
//   <ul>
//     {links.map(({ href, label }) => (
//       <li key={`nav-link-${href}-${label}`}>
//         <Link href={href}>
//           <a>{label}</a>
//         </Link>
//       </li>
//     ))}
//   </ul>

//   <style jsx>{`

//     nav {
//       text-align: center;
//       position: absolute;
//       right: 0;
//       left: 0;
//       top: 0;
//       z-index: 1;

//     }
//     ul {
//       display: flex;
//       justify-content: flex-end;
//       background-color: #333;

//     }
//     nav > ul {
//       padding: 4px 16px;
//       margin: 0;
//     }
//     li {
//       display: flex;
//       padding: 8px 16px;
//     }
//     a {
//       color: #a3a3a3;
//       text-decoration: none;
//       font-size: 24px;
//       font-weight: 100;
//     }
//   `}</style>
// </nav>