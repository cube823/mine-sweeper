import { HTMLAttributes } from 'react'
import { styled } from 'styled-components'

interface ImageProps extends HTMLAttributes<unknown> {
  width: number
  height: number
  src: string
  alt: string
}

const Image = ({ width, height, src, alt, ...props }: ImageProps) => {
  return <Container width={width} height={height} src={src} alt={alt} {...props} />
}

const Container = styled.img<{ width: number; height: number }>`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  display: inline-block;
  image-rendering: pixelated;
  cursor: pointer;
`

export default Image
