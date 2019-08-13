import React from 'react'

const layout = (props) => {
  return (
    <div className="layout">
    {props.children}
    <style jsx>{`
.layout {
  max-width: 1200px;
  margin: auto;
}
    `}</style>
  </div>

  )
}
export default layout