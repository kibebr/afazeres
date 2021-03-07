import React, { FunctionComponent } from 'react'

export const MediumModalForeground = ({ children }) => (
  <div className='absolute inset-center w-full h-full md:w-3/6 md:h-4/6 bg-white rounded-md z-50 p-4'>
    {children}
  </div>
)
