import React from 'react'
import Link from 'next/link'

const links = [
  { href: '/404', label: 'כשרונות צעירים' },
  { href: '/404', label: 'מצעד' },
  { href: '/', label: 'בית' },
].map(link => {
  link.key = `nav-link-${link.href}-${link.label}`
  return link
})

const Nav = () => (
  <nav>
    <ul>
      {links.map(({ key, href, label }) => (
        <li key={key}>
          <Link href={href}>
            <a>{label}</a>
          </Link>
        </li>
      ))}
    </ul>

    <style jsx>{`
      :global(body) {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, Avenir Next, Avenir,
          Helvetica, sans-serif;
      }
      nav {
        text-align: center;
        position: absolute;
        right: 0;
        left: 0;
        top: 0;
        z-index: 1;

      }
      ul {
        display: flex;
        justify-content: flex-end;
        background-color: #333;

      }
      nav > ul {
        padding: 4px 16px;
        margin: 0;
      }
      li {
        display: flex;
        padding: 8px 16px;
      }
      a {
        color: #a3a3a3;
        text-decoration: none;
        font-size: 24px;
        font-weight: 100;
      }
    `}</style>
  </nav>
)

export default Nav
