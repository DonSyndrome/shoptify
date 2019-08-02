import React, {useState} from 'react';
// import Link from 'next/link'
// import AddPlylist from '../../components/AddPLaylist';
// import AddPlylist from '../../src/components/AddPLaylistHOC';
import AddPlylist from '../../src/components/formik/AddPlaylistFormik';

const page =  ({data}) => {

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
  