import { SVGProps } from 'react'

type Props = SVGProps<SVGSVGElement> & {
  colorIcon?: 'lightgreen' | 'white'
}

export function SunIcon({ colorIcon = 'white', ...props }: Props) {

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 16 16"
      {...props}
    >
      <path
        fill={colorIcon}
        d="M7 0h2v2H7zM1 9h6v2H1zM1 15v-2h14v2zM15 9H9v2h6zM1.497 4.222.98 6.154l1.932.518.517-1.932zM14.503 4.222l.517 1.932-1.931.518-.518-1.932zM5 7a3 3 0 0 1 6 0zM11.468.838l1.587 1.217-1.218 1.587-1.586-1.218zM4.532.838 2.945 2.055l1.218 1.587L5.75 2.424z"
      ></path>
    </svg>
  )
}