import React, { FunctionComponent, useState } from 'react'
import { AfazeresContainer } from './components/AfazeresContainer'
import { render } from 'react-dom'
import { Sidebar } from './components/Sidebar'
import { ReactComponent as PersonIcon } from '../assets/icons/person.svg'
import { ReactComponent as SearchIcon } from '../assets/icons/search.svg'
import './index.css'

export interface Afazer {
  content: string
}

export interface AfazeresContainer {
  color: string
  afazeres: Afazer[]
}

export interface User {
  username: string
  folders: Folder[]
}

export interface Folder {
  name: string
  color: string
  afazeresContainers: AfazeresContainer[]
}

const sampleAfazer: Afazer = {
  content: 'afazer1'
}

const sampleAfazer2: Afazer = {
  content: 'blah'
}

const sampleAfazeresContainer: AfazeresContainer = {
  color: 'bg-red-400',
  afazeres: [sampleAfazer]
}

const sampleAfazeresContainer2: AfazeresContainer = {
  color: 'bg-red-400',
  afazeres: [sampleAfazer, sampleAfazer2]
}

const sampleFolder: Folder = {
  name: 'Health',
  color: 'bg-green-400',
  afazeresContainers: [sampleAfazeresContainer]
}

const sampleFolder2: Folder = {
  name: 'Tech stuff',
  color: 'bg-red-400',
  afazeresContainers: [sampleAfazeresContainer2]
}

const sampleUser: User = {
  username: 'vitor',
  folders: [sampleFolder, sampleFolder2]
}

const App: FunctionComponent = () => {
  const [user, setUser] = useState<User | null>({ username: 'kibe' })
  const [selectedFolder, setSelectedFolder] = useState<Folder>(sampleFolder)

  const handleAddAfazer = (afazer: Afazer): void => {
    console.log('added afazer!')
  }

  const handleSelectFolder = (folder: Folder): void => {
    setSelectedFolder(folder)
  }

  return (
    <div className='bg-gray-50 outline-none antialiased'>
      <div className='flex flex-col md:flex-row'>
        <Sidebar folders={sampleUser.folders} onSelectFolder={handleSelectFolder} />
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
            {selectedFolder.afazeresContainers.map((ac) => (
              <AfazeresContainer afazeres={ac.afazeres} onAddAfazer={handleAddAfazer} />
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}

render(<App />, document.getElementById('root'))
