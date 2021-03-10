import React, { FunctionComponent } from 'react'

export const Tag: FunctionComponent = ({ children }) => (
  <div className='bg-gray-100 rounded-sm text-gray-700 text-xs py-1 px-3 font-bold'>
    {children}
  </div>
)
