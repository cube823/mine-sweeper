import Image from '../Image'

const imgSrcset = [
  '/time_zero.png',
  '/time_one.png',
  '/time_two.png',
  '/time_three.png',
  '/time_four.png',
  '/time_five.png',
  '/time_six.png',
  '/time_seven.png',
  '/time_eight.png',
  '/time_nine.png',
]

interface DisplayBoardProps {
  value: number
}

function DisplayBoard({ value }: DisplayBoardProps) {
  return (
    <div>
      <Image
        width={13}
        height={23}
        src={imgSrcset[Math.floor(value / 100) % 10]}
        alt={'third-digit'}
      />
      <Image
        width={13}
        height={23}
        src={imgSrcset[Math.floor(value / 10) % 10]}
        alt={'second-digit'}
      />
      <Image width={13} height={23} src={imgSrcset[value % 10]} alt={'first-digit'} />
    </div>
  )
}

export default DisplayBoard
