import React, { useState, useRef } from 'react'
import { Afazer } from '../../domain/Afazer'
import { Card } from '../Card/Card'
import { ReactComponent as Menu } from '../../../assets/icons/three-dots-vertical.svg'
import { ContainerIcon } from './ContainerIcon'
import { EditableContainerIcon } from './EditableContainerIcon.tsx'
import { Transition } from '@headlessui/react'
import { Textarea } from '../Textarea'
import { AfazerComponent } from '../AfazerComponent'
import { Container } from '../../domain/Container'

const standardOpacityTrans = {
  enter: 'transition-opacity duration-300',
  enterFrom: 'opacity-0',
  enterTo: 'opacity-100',
  leave: 'transition-opacity duration-300',
  leaveFrom: 'opacity-100',
  leaveTo: 'opacity-0'
}

interface ContainerComponentProps {
  title: string
  container: Container
  onAddAfazer: (s: string) => unknown
  onChangeContainerTitle: (t: string, c: Container) => unknown
}

export const ContainerComponent = ({
  container,
  onAddAfazer,
  onChangeContainerTitle
}: ContainerComponentProps): JSX.Element => {
  const [isHovering, setIsHovering] = useState<boolean>(false)
  const textarea = useRef<HTMLTextAreaElement | null>(null)

  const handleOnFocusOut = (): void => {
    if (textarea.current !== null) {
      const value = textarea.current.value
      if (value.length > 0) {
        onAddAfazer(value)
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
        <EditableContainerIcon classes='flex-shrink-0' />

        <div className='flex flex-1 flex-col'>
          <div className='flex flex-row justify-between w-full'>
            <input
              className='font-bold text-xl w-full'
              defaultValue={container.title}
              onBlur={({ target }): unknown => onChangeContainerTitle(target.value, container)}
            />
            <Transition show={isHovering} {...standardOpacityTrans}>
              <button className='hover:bg-gray-100 p-2 rounded-md transition-colors'>
                <Menu />
              </button>
            </Transition>
          </div>
        </div>

      </div>

      <ul className='flex flex-col text-sm space-y-2'>
        {Object.values(container.afazeres).map(({ content }) => (
          <AfazerComponent content={content} onChangeContent={(s): void => console.log(s)}/>
        ))}

        <Transition
          show={isHovering || (textarea.current !== null && textarea.current.value.length > 0)}
          {...standardOpacityTrans}
        >
          <Textarea
            ref={textarea}
            maxRows={5}
            className='w-full'
            onBlur={handleOnFocusOut}
          />
        </Transition>
      </ul>
    </Card>
  )
}
