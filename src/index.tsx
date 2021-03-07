import React, { FunctionComponent, useState, useEffect } from 'react'
import { render } from 'react-dom'
import { Sidebar } from './components/Sidebar'
import { Card } from './components/Card'
import { Afazer } from './domain/Afazer'
import { AfazeresContainerComponent } from './components/AfazeresContainerComponent'
import { AddAfazeresContainerCard } from './components/AddAfazeresContainerCard'
import { Folder, deleteFolderFrom } from './domain/Folder'
import { ReactComponent as PersonIcon } from '../assets/icons/person.svg'
import { ReactComponent as SearchIcon } from '../assets/icons/search.svg'
import { ReactComponent as PlusIcon } from '../assets/icons/plus.svg'
import { getUser } from './mappers/index'
import './index.css'

export interface UserInfo {
  username: string
}

const App: FunctionComponent = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>({ username: 'DEMO' })
  const [folders, setFolders] = useState<Folder[]>([])
  const [selectedFolder, setSelectedFolder] = useState<Folder | null>(null)

  useEffect((): void => {
    getUser()
      .then(({ username, folders }) => {
        setUserInfo({ username })
        setFolders(folders)
        setSelectedFolder(folders[0] ?? null)
        console.log(folders)
      })
      .catch((err) => console.error(err))
  }, [])

  const handleAddAfazer = (afazer: Afazer): void => {

  }

  const handleSelectFolder = (folder: Folder): void => {
    setSelectedFolder(folder)
    console.log(folder)
  }

  const handleDeleteFolder = (folder: Folder): void => {
    setFolders(deleteFolderFrom(folder))

    if (folder.id === selectedFolder?.id) {
      setSelectedFolder(null)
    }
  }

  return (
    <div className='bg-gray-50 outline-none antialiased'>
      <div className='flex flex-col md:flex-row'>
        <Sidebar
          folders={folders}
          onSelectFolder={handleSelectFolder}
          onDeleteFolder={handleDeleteFolder}
        />

        <div className='p-4 flex-1 w-full rounded-xl shadow-sm'>

          <nav className='flex flex-row w-full items-center'>
            <div>
              <div className='py-1 px-6 rounded-md text-white text-center bg-blue-450 shadow-md font-bold'>
                Afazeres
              </div>
            </div>

            <div className='flex flex-row items-center ml-auto space-x-2'>
              <button className='hover:bg-gray-200 transition-colors rounded-md p-2'>
                <SearchIcon className='w-5 h-5' />
              </button>
              <button className='hover:bg-gray-200 transition-colors rounded-md p-1'>
                <PersonIcon className='w-7 h-7' />
              </button>
            </div>
          </nav>

          <div className='flex flex-wrap flex-col items-center md:flex-row space-y-4 md:space-y-0 md:space-x-4 mt-4'>
            {selectedFolder?.afazeresContainers.map(({ title, afazeres }) => (
              <AfazeresContainerComponent title={title} afazeres={afazeres} onAddAfazer={handleAddAfazer} />
            ))}
            <AddAfazeresContainerCard onAdd={(e): void => console.log(e)} />
          </div>

        </div>
      </div>
    </div>
  )
}

render(<App />, document.getElementById('root'))
