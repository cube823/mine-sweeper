import { HTMLAttributes } from 'react'
import { styled } from 'styled-components'

interface ImageProps extends HTMLAttributes<unknown> {
  width: number
  height: number
  src: string
  alt: string
  clickable?: boolean
}

const Image = ({ width, height, src, alt, clickable, ...props }: ImageProps) => {
  return (
    <Container
      width={width}
      height={height}
      src={src}
      alt={alt}
      clickable={`${clickable}`}
      {...props}
    />
  )
}

const Container = styled.img<{ width: number; height: number; clickable?: string }>`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  display: inline-block;
  image-rendering: pixelated;
  cursor: ${(props) => (props.clickable ? 'pointer' : 'default')};
`

export default Image
