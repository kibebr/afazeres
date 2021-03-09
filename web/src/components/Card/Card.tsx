import React, { FunctionComponent, MouseEventHandler } from 'react'

interface CardProps {
  classes?: string
  onMouseEnter?: MouseEventHandler<HTMLDivElement>
  onMouseLeave?: MouseEventHandler<HTMLDivElement>
}

export const Card: FunctionComponent<CardProps> = ({ children, classes, onMouseEnter, onMouseLeave }) => (
  <div
    className={`p-6 shadow-lg h-96 md:w-96 md:h-112 rounded-xl bg-white ${classes !== undefined ? classes : ''}`}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    {children}
  </div>
)
