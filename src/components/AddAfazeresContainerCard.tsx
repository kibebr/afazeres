import React from 'react'
import { Card } from './Card'
import { AfazeresContainerIcon } from './AfazeresContainerIcon'

interface AddAfazeresContainerCardProps {
  onAdd: React.MouseEventHandler<HTMLButtonElement>
}

export const AddAfazeresContainerCard = ({ onAdd }: AddAfazeresContainerCardProps): JSX.Element => (
  <Card classes='w-full bg-gray-100 transition-colors shadow-none hover:bg-green-100 hover:ring-2 ring-green-200'>
    <button className='flex flex-col space-y-4 w-full h-full animate-pulse' onClick={onAdd}>
      <div className='flex flex-row space-x-4'>
        <AfazeresContainerIcon classes='bg-gray-100' />
        <span className='w-20 h-5 bg-gray-100 rounded-md'></span>
      </div>
      <ul className='flex flex-col space-y-2 flex-1 w-full'>
        <span className='w-full h-8 bg-gray-100 rounded-md'></span>
        <span className='w-full h-8 bg-gray-100 rounded-md'></span>
      </ul>
    </button>
  </Card>
)

