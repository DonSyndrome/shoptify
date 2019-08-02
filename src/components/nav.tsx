import React from 'react'
import Head from 'next/head'


const Nav = () => (
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
            height:50px;
            position: sticky;
            top:0;
            z-index: 5;
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

   
)

export default Nav


// import Link from 'next/link'
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