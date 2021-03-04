import React, { FunctionComponent, useState, useEffect } from 'react'
import { Folder } from '../index'
import { ReactComponent as PlusIcon } from '../../assets/icons/plus.svg'

interface SidebarProps {
  folders: Folder[]
}

export const Sidebar: FunctionComponent<SidebarProps> = ({ folders }) => {
  const [selectedFolder, setSelectedFolder] = useState<Folder>()

  return (
    <div
      className='px-4 md:py-4 flex flex-row md:flex-col w-full md:w-52 space-x-4 md:space-x-0 md:space-y-1 h-14 md:h-screen bg-gray-200 md:hover:w-52 transition-width'
    >
      <button className='rounded-md font-bold text-white shadow-md bg-green-400 w-full py-1 mb-4'>
        <span>Create new folder</span>
      </button>

      {folders.map((folder) => (
        <button className='flex flex-row items-center space-x-2 hover:bg-gray-300 p-2 rounded-md transition-colors'>
          <div className='w-7 h-7 bg-white rounded-md shadow-md'></div>
          <span className='font-bold text-gray-700'>{folder.name}</span>
        </button>
      ))}
    </div>
  )
}
