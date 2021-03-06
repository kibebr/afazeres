import React, { FunctionComponent, FocusEvent, useState, useRef } from 'react'
import { Afazer } from '../domain/Afazer'
import { Card } from './Card'
import { ReactComponent as Menu } from '../../assets/icons/three-dots-vertical.svg'
import { Transition } from '@headlessui/react'
import TextareaAutosize from 'react-textarea-autosize'

const standardOpacityTrans = {
  enter: 'transition-opacity duration-300',
  enterFrom: 'opacity-0',
  enterTo: 'opacity-100',
  leave: 'transition-opacity duration-300',
  leaveFrom: 'opacity-100',
  leaveTo: 'opacity-0'
}

interface AfazeresContainerProps {
  afazeres: Afazer[]
  onAddAfazer: (afazer: Afazer) => unknown
}

export const AfazeresContainerComponent = ({ afazeres, onAddAfazer }: AfazeresContainerProps): JSX.Element => {
  const [isHovering, setIsHovering] = useState<boolean>(false)

  const textarea = useRef<HTMLTextAreaElement | null>(null)

  const handleOnFocusOut = (): void => {
    if (textarea.current !== null) {
      const value = textarea.current.value
      if (value.length > 0) {
        onAddAfazer({ content: value })
        textarea.current.value = ''
      }
    }
  }

  return (
    <Card
      classes='flex flex-col space-y-4 overflow-y-auto w-full'
      onMouseEnter={(): void => setIsHovering(true)}
      onMouseLeave={(): void => setIsHovering(false)}
    >
      <div className='flex flex-row space-x-4 h-auto w-full'>
        <button className='w-16 h-16 bg-red-400'></button>
        <div className='flex flex-1 flex-col'>
          <div className='flex flex-row justify-between w-full'>
            <h2 className='font-bold text-xl'>Most important</h2>
            <Transition
              show={isHovering}
              {...standardOpacityTrans}
            >
              <button className='hover:bg-gray-100 p-2 rounded-md transition-colors'>
                <Menu />
              </button>
            </Transition>
          </div>
        </div>
      </div>

      <div>
        <ul className='flex flex-col text-sm space-y-2'>
          {afazeres.map((afazer) => (
            <TextareaAutosize
              maxRows={5}
              defaultValue={afazer.content}
              className='transition-height resize-none bg-gray-100 rounded-md p-2 focus:ring-2 ring-gray-200 hover:ring-1'
            />
          ))}
          <Transition
            show={isHovering || (textarea.current !== null && textarea.current.value.length > 0)}
            {...standardOpacityTrans}
          >
            <TextareaAutosize
              ref={textarea}
              maxRows={5}
              className='w-full transition-height resize-none bg-gray-100 rounded-md p-2 hover:ring-1 focus:ring-2 ring-gray-200'
              onBlur={handleOnFocusOut}
            />
          </Transition>
        </ul>
      </div>
    </Card>
  )
}
