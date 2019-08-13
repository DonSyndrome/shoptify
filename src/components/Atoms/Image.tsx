import React from 'react'
import { useAmp } from 'next/amp'

type Props = {
  alt: string,
  src: string,
  width?: number | string,
  height?: number | string,
  layout?: Layout,
}
export enum Layout {
  fill = 'fill', fixed = 'fixed', fixedHeight = 'fixed-height', flexItem = 'flex-item', intrinsic = 'intrinsic', nodisplay = 'nodisplay', responsive = 'responsive'
}

const Image = ({ alt, src, width, height, layout }: Props) => {
  const isAmp = useAmp()
  return (
    <div>
      {isAmp ?
        // culd not TypedIt to the JSX HTML type system so this is what there is sry
        // @ts-ignore: there is amp image. 
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