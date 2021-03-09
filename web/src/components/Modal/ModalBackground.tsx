import React, { FunctionComponent } from 'react'

export const ModalBackground: FunctionComponent = ({ children }) => (
  <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-30 z-50'>
    {children}
  </div>
)
