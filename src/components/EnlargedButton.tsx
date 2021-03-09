import React, { FunctionComponent, MouseEventHandler } from 'react'

interface EnlargedButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement>
  classes?: string
}
export const EnlargedButton: FunctionComponent<EnlargedButtonProps> = ({ classes, children, onClick }) => (
  <button
    onClick={onClick}
    className={`py-1 px-6 rounded-md text-white text-center bg-green-400 shadow-md font-bold mb-2 ${classes ?? ''}`}
  >
    {children}
  </button>
)
