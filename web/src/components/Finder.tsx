import React, { ChangeEventHandler, useState } from 'react'
import { Folder } from '../domain/Folder'
import { Afazer } from '../domain/Afazer'

interface FinderProps {
  folders: Record<string, Folder>
}

export const Finder = ({ folders }: FinderProps): JSX.Element => {
  const [foundAfazeres, setFoundAfazeres] = useState<Afazer[]>([])

  const handleQuery: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    console.log('typed in: ', target.value)
  }

  return (
    <div>
      <h2 className='font-bold text-3xl'>Finder</h2>
      <input
        placeholder='Search for afazeres'
        className='bg-gray-100 p-2 focus:ring focus:ring-blue-200 rounded-md'
        onChange={handleQuery}
      />
    </div>
  )
}
