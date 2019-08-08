import React from 'react'
import styles from '../../styles'
import { useAmp } from 'next/amp'

type Props = {
  alt:string, 
  src:string,
  width?:number | string ,
  height?:number | string,
  layout?:Layout,
}
export enum Layout {
  'fill', 'fixed', 'fixed-height', 'flex-item', 'intrinsic', 'nodisplay', 'responsive'
}

const Image = ({ alt, src,width,height,layout}:Props )=> {
  const isAmp = useAmp()
    return (
        <div>
        {isAmp ?
            <amp-img 
              alt={alt}
              src={src}
              width={width}
              height={height}
              layout={layout}
            /> :
            <div>
              <img 
                alt={alt}
                src={src}
                width={width}
                height={height}
              />
            </div>
            
          }
<style jsx>{`
img {
  width: 100%;
  max-width:450px;
  height: auto;
}

`}</style>
        </div>
    )
}
export default Image