import React, { FunctionComponent, useState, useEffect } from 'react'
import { render } from 'react-dom'
import { Sidebar } from './components/Sidebar'
import { Afazer, createAfazer } from './domain/Afazer'
import { ContainerComponent } from './components/Container/ContainerComponent'
import { AddContainerCard } from './components/Card/AddContainerCard'
import { Folder, deleteFolderFrom, addContainerTo } from './domain/Folder'
import { ReactComponent as PersonIcon } from '../assets/icons/person.svg'
import { ReactComponent as SearchIcon } from '../assets/icons/search.svg'
import { getUser } from './mappers/index'
import { ModalBackground } from './components/Modal/ModalBackground'
import { MediumModalForeground } from './components/Modal/MediumModalForeground'
import { ReactComponent as XIcon } from '../assets/icons/x.svg'
import { FolderList } from './components/Folder/FolderList'
import { Message } from './components/Message'
import { Container, createContainer } from './domain/Container'
import { useIsDeviceSmall } from './hooks/useIsDeviceSmall'
import Picker from 'emoji-picker-react'
import './index.css'

export interface UserInfo {
  username: string
}

const App: FunctionComponent = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>({ username: 'DEMO' })
  const [folders, setFolders] = useState<Folder[]>([])
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null)
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')

  const isMobile = useIsDeviceSmall()

  useEffect((): void => {
    getUser()
      .then(({ username, folders }) => {
        setUserInfo({ username })
        setFolders(folders)
        setSelectedFolder(folders[0]?.id ?? null)
      })
      .catch((err) => console.error(err))
  }, [])

  useEffect((): void => {
    setTimeout((): void => {
      setMessage('')
    }, 1000)
  }, [message])

  const handleAddAfazer = (c: Container) => (s: string): void => {
    const afazer = createAfazer({ content: s })
    setFolders((fs) => fs.map((f) => ({
      ...f,
      containers: f.containers.map((_c) => _c.id === c.id ? ({ ..._c, afazeres: _c.afazeres.concat(afazer) }) : _c)
    })))
  }

  const handleAddFolder = (): void => {
    window.alert('to add folder')
  }

  const handleSelectFolder = ({ id }: Folder): void => setSelectedFolder(id)

  const handleAddContainer = (): void => {
    if (selectedFolder !== null) {
      const container = createContainer()
      setFolders((fs) => fs.map((f) => f.id === selectedFolder ? addContainerTo(container)(f) : f))
    }
  }

  const handleDeleteFolder = (f: Folder): void => {
    setFolders(deleteFolderFrom(f))

    if (f.id === selectedFolder) {
      setSelectedFolder(null)
    }
  }

  return (
    <div className='bg-gray-50 outline-none antialiased outline-black'>
      {modalOpen && (
        <ModalBackground>
          <MediumModalForeground>
            <div className='h-full flex flex-col space-y-4'>
              <div className='flex flex-row-reverse'>
                <button onClick={(): void => setModalOpen(false)} className='p-1 rounded-md hover:bg-red-400 hover:text-white transition-colors'>
                  <XIcon className='w-5 h-5'/>
                </button>
              </div>
              <h2 className='font-bold text-3xl'>Finder</h2>
              <input placeholder='Search for afazeres' className='bg-gray-100 p-2 focus:ring focus:ring-blue-200 rounded-md' />
            </div>
          </MediumModalForeground>
        </ModalBackground>
      )}

      <div className='flex flex-col md:flex-row h-full'>
        <Sidebar>
          {!isMobile && (
            <button
              onClick={handleAddFolder}
              className='p-1 rounded-md text-white text-center bg-green-400 shadow-md font-bold'
            >
              Create new folder
            </button>
          )}
          <FolderList
            folders={folders}
            onSelectFolder={handleSelectFolder}
            onDeleteFolder={handleDeleteFolder}
          />
        </Sidebar>

        <div className='p-4 flex-1 w-full rounded-xl shadow-sm min-h-screen h-full'>

          <nav className='flex flex-row w-full items-center'>
            <div>
              <div className='py-1 px-6 rounded-md text-white text-center bg-blue-450 shadow-md font-bold'>
                Afazeres
              </div>
            </div>

            <div className='flex flex-row items-center ml-auto space-x-2'>
              <button onClick={(): void => setModalOpen(true)}className='hover:bg-gray-200 transition-colors rounded-md p-2'>
                <SearchIcon className='w-5 h-5' />
              </button>
              <button className='hover:bg-gray-200 transition-colors rounded-md p-1'>
                <PersonIcon className='w-7 h-7' />
              </button>
            </div>
          </nav>

          <div className='flex flex-col md:flex-row flex-wrap overflow-hidden -mx-2'>
            {folders.find(f => f.id === selectedFolder)?.containers.map((c) => (
              <div className='px-2 my-2'>
                <ContainerComponent
                  container={c}
                  title='test'
                  onAddAfazer={(content): void => handleAddAfazer(c)(content)}
                  onChangeAfazerContainerTitle={(): void => console.log('changed container title')}
                />
              </div>
            ))}
            {selectedFolder !== null && <div className='px-2 my-2'><AddContainerCard onAdd={handleAddContainer} /></div>}
          </div>

        </div>
      </div>
    </div>
  )
}

render(<App />, document.getElementById('root'))
