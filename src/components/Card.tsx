import React, { ReactNode, FunctionComponent } from 'react'

interface CardProps {
  children: ReactNode
}

export const Card: FunctionComponent<CardProps> = ({ children }) => (
  <div className='shadow-lg w-96 h-112 rounded-xl bg-white transform transition-transform hover:scale-105'>
    {children}
  </div>
)
