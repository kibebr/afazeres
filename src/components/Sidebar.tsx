import React, { FunctionComponent, useState, useEffect } from 'react'
import { SmallFolderIcon } from './SmallFolderIcon'
import { Folder } from '../domain/Folder'
import { ReactComponent as PlusIcon } from '../../assets/icons/plus.svg'
import { ReactComponent as XIcon } from '../../assets/icons/x.svg'
import ReactTooltip from 'react-tooltip'
import { useMediaQuery } from 'react-responsive'

interface SidebarProps {
  folders: Folder[]
  onSelectFolder: (folder: Folder) => unknown
  onDeleteFolder: (folder: Folder) => unknown
}

export const Sidebar: FunctionComponent<SidebarProps> = ({ folders, onSelectFolder, onDeleteFolder }) => {
  const isSmall = useMediaQuery({
    query: '(max-width: 768px)'
  })

  useEffect((): void => {
    console.log(isSmall)
  }, [isSmall])

  return (
    <div
      className='px-4 md:py-4 flex flex-row md:flex-col w-full md:w-52 space-x-2 md:space-x-0 md:space-y-1 h-14 md:h-screen bg-gray-200 md:hover:w-52 transition-width'>
      {!isSmall && (
        <button
          data-tip
          data-for='create'
          data-event='click'
          className='rounded-md font-bold text-white shadow-md bg-green-400 w-7 md:w-full md:py-1 md:mb-4'
        >
          <span>Create new folder</span>
        </button>
      )}

      <ReactTooltip id='create' className='bg-white text-black rounded-md shadow-md p-10 opacity-100' effect='solid' clickable={true}>
        <h2>Create a folder</h2>
      </ReactTooltip>

      {folders.map((folder) => (
        <button
          className={!isSmall ? 'flex flex-row items-center hover:bg-gray-300 p-2 rounded-md transition-colors' : ''}
          onClick={(): unknown => onSelectFolder(folder)}
        >
          <SmallFolderIcon color={folder.color} />
          {!isSmall && (
            <>
              <span className='font-bold text-gray-700 ml-2'>{folder.title}</span>
              <button
                className='ml-auto hover:bg-red-500 hover:text-white transition-colors rounded-full'
                onClick={(e): void => { e.stopPropagation(); onDeleteFolder(folder) } }
              >
                <XIcon />
              </button>
            </>
          )}
        </button>
      ))}
  </div>
  )
}
