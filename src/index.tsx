import React, { FunctionComponent, useState, useEffect } from 'react'
import { render } from 'react-dom'
import { Sidebar } from './components/Sidebar'
import { createAfazer } from './domain/Afazer'
import { ContainerComponent } from './components/Container/ContainerComponent'
import { AddContainerCard } from './components/Card/AddContainerCard'
import { Folder, deleteFolderFrom } from './domain/Folder'
import { getUser } from './mappers/index'
import { ModalBackground } from './components/Modal/ModalBackground'
import { MediumModalForeground } from './components/Modal/MediumModalForeground'
import { ReactComponent as XIcon } from '../assets/icons/x.svg'
import { FolderList } from './components/Folder/FolderList'
import { Container, addAfazer } from './domain/Container'
import { useIsDeviceSmall } from './hooks/useIsDeviceSmall'
import { Navbar } from './components/Navbar'
import { EnlargedButton } from './components/EnlargedButton'
import update from 'immutability-helper'
import './index.css'

export interface UserInfo {
  username: string
}

const App: FunctionComponent = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>({ username: 'DEMO' })
  const [folders, setFolders] = useState<Record<string, Folder>>({})
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null)
  const [finderModalOpen, setFinderModalOpen] = useState<boolean>(false)

  const isMobile = useIsDeviceSmall()

  useEffect((): void => {
    getUser()
      .then(({ username, folders }) => {
        setUserInfo({ username })
        setFolders(folders)
        setSelectedFolder(Object.keys(folders)[0] ?? null)
      })
      .catch((err) => console.error(err))
  }, [])

  const handleAddAfazer = (c: Container) => (s: string): void => {
    setFolders(update(
      folders,
      {
        [c.refParent]: {
          containers: {
            [c.id]: {
              $apply: addAfazer(createAfazer({ content: s }))
            }
          }
        }
      }
    ))
  }

  const handleAddFolder = (): void => {
    window.alert('to add folder')
  }

  const handleSelectFolder = ({ id }: Folder): void => setSelectedFolder(id)

  const handleAddContainer = (): void => {
    if (selectedFolder !== null) {
      // TODO
    }
  }

  const handleChangeContainerTitle = (t: string, c: Container): void => {
    // TODO
  }

  const handleChangeContainerEmoji = (e: string, c: Container): void => {
    // TODO
  }

  const handleDeleteFolder = (f: Folder): void => {
    setFolders(deleteFolderFrom(f))

    if (f.id === selectedFolder) {
      setSelectedFolder(null)
    }
  }

  return (
    <div className='bg-gray-50 outline-none antialiased outline-black'>
      {finderModalOpen && (
        <ModalBackground>
          <MediumModalForeground>
            <div className='h-full flex flex-col space-y-4'>
              <div className='flex flex-row-reverse'>
                <button
                  onClick={(): void => setFinderModalOpen(false)}
                  className='p-1 rounded-md hover:bg-red-400 hover:text-white transition-colors'
                >
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
           <EnlargedButton onClick={handleAddFolder} classes='px-1'>
              Create new folder
            </EnlargedButton>
          )}
          <FolderList
            folders={folders}
            onSelectFolder={handleSelectFolder}
            onDeleteFolder={handleDeleteFolder}
          />
        </Sidebar>

        <div className='p-4 flex-1 w-full rounded-xl shadow-sm min-h-screen h-full'>
          <Navbar
            onClickSearch={(): void => undefined}
            onClickPerson={(): void => undefined}
          />

          <div className='flex flex-col md:flex-row flex-wrap overflow-hidden -mx-2'>
            {selectedFolder !== null && Object.values(folders[selectedFolder].containers).map((c) => (
              <div className='px-2 my-2'>
                <ContainerComponent
                  key={c.id}
                  container={c}
                  title='test'
                  onAddAfazer={handleAddAfazer(c)}
                  onChangeContainerTitle={(): void => console.log('changed container title')}
                  onChangeContainerEmoji={(): void => undefined}
                />
              </div>
            ))}
            {selectedFolder !== null && (
              <div className='px-2 my-2'>
                <AddContainerCard onAdd={handleAddContainer} />
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}

render(<App />, document.getElementById('root'))
