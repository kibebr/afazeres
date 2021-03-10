import React from 'react'

interface CheckboxProps {
  onCheck: () => unknown
}

export const Checkbox = ({ onCheck }: CheckboxProps): JSX.Element => (
  <input type='checkbox' className='p-5 w-5 h-5'/>
)
