import React, { FunctionComponent } from 'react'

export const Sidebar: FunctionComponent = ({ children }) => (
  <div
    className='px-4 md:py-4 flex flex-row md:flex-col w-full md:w-64 space-x-2 md:space-x-0 md:space-y-1 h-14 md:h-auto bg-gray-200'
  >
    {children}
  </div>
)
