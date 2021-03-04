import React, { FunctionComponent, useState } from 'react'
import { Card } from './components/Card'
import { render } from 'react-dom'
import { Sidebar } from './components/Sidebar'
import { ReactComponent as PersonIcon } from '../assets/icons/person.svg'
import { ReactComponent as SearchIcon } from '../assets/icons/search.svg'
import './index.css'

export interface Afazer {
  title: string
}

export interface User {
  username: string
  folders: Folder[]
}

export interface Folder {
  name: string
  afazeres: Afazer[]
}

const sampleAfazer: Afazer = {
  title: 'afazer1'
}

const sampleFolder: Folder = {
  name: 'Health',
  afazeres: [sampleAfazer]
}

const sampleFolder2: Folder = {
  name: 'Tech stuff',
  afazeres: [sampleAfazer]
}

const sampleUser: User = {
  username: 'vitor',
  folders: [sampleFolder, sampleFolder2]
}

const App: FunctionComponent = () => {
  const [user, setUser] = useState<User | null>({ username: 'kibe' })

  return (
    <div className='bg-gray-50 outline-none antialiased'>
      <div className='flex flex-col md:flex-row'>
        <Sidebar folders={sampleUser.folders} />
        <div className='p-4 flex-1 w-full rounded-xl shadow-sm'>
          <nav className='flex flex-row w-full items-center'>
            <div>
              <div className='py-1 px-6 rounded-md text-white text-center bg-blue-450 shadow-md font-bold'>
                See more
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
          <div className='flex flex-wrap flex-row space-x-4 mt-4'>
            <Card>
              test
            </Card>
            <Card>
              test
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

render(<App />, document.getElementById('root'))
