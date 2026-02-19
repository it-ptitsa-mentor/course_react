import { SVGProps } from 'react'

type Props = SVGProps<SVGSVGElement> & {
  colorIcon?: 'lightgreen' | 'white'
}

export function PlusIcon({ colorIcon = 'white', ...props }: Props) {

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        stroke={colorIcon}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M4 12h16m-8-8v16"
      ></path>
    </svg>
  )
}