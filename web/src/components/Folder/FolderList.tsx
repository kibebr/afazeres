import React from 'react'
import { Folder } from '../../domain/Folder'
import { ReactComponent as XIcon } from '../../../assets/icons/x.svg'
import { SmallFolderIcon } from './SmallFolderIcon'
import { useIsDeviceSmall } from '../../hooks/useIsDeviceSmall'

interface FolderListProps {
  folders: { [key: string]: Folder }
  onSelectFolder: (f: Folder) => unknown
  onDeleteFolder: (f: Folder) => unknown
}

export const FolderList = ({ folders, onSelectFolder, onDeleteFolder }: FolderListProps): JSX.Element => {
  const isSmall = useIsDeviceSmall()

  return (
    <div className='flex flex-row md:flex-col space-x-4 md:space-x-0'>
      {Object.values(folders).map((folder) => (
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
