import React from 'react';
import AddPlylist from '../../src/components/AddPLaylistHOC';


const page =  () => {

  return (
    <div className="layout">
      <AddPlylist
      />
      <style jsx>{`
  .layout {
    max-width: 1200px;
    margin: auto;
  }
      `}</style>
    </div>
  
  )
}


  export default page
  