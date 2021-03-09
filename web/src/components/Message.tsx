import React, { FunctionComponent } from 'react'
import { Transition } from '@headlessui/react'

export const Message: FunctionComponent = ({ children }) => (
  <Transition
    show={true}
    enter='transition-opacity duration-300'
    enterFrom='opacity-0'
    enterTo='opacity-100'
    leave='transition-opacity duration-300'
    leaveFrom='opacity-100'
    leaveTo='opacity-0'
  >
    <div className='absolute bottom-5 inset-center-x bg-red-200 ring-2 ring-red-300 w-60 h-auto p-2 rounded-md'>
      {children}
    </div>
  </Transition>
)
