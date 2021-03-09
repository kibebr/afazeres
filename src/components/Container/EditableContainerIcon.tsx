import React, { useState, MouseEvent } from 'react'
import { ContainerIcon } from './ContainerIcon'
import Picker, { IEmojiData } from 'emoji-picker-react'

interface EditableContainerIconProps {
  classes?: string
  emoji: string
  onSelectNewEmoji: (e: string) => unknown
}

export const EditableContainerIcon = ({ onSelectNewEmoji, emoji, classes }: EditableContainerIconProps): JSX.Element => {
  const [emojiPickerVisible, setEmojiPickerVisible] = useState<boolean>(false)

  const handleEmojiClick = (_: MouseEvent, { emoji }: IEmojiData): void => {
    setEmojiPickerVisible(false)
    onSelectNewEmoji(emoji)
  }

  return (
    <>
      {emojiPickerVisible && (
        <div className='absolute'>
          <Picker onEmojiClick={handleEmojiClick} />
        </div>
      )}
      <button onClick={(): void => setEmojiPickerVisible((b) => !b)}>
        <ContainerIcon classes={classes ?? ''}>
          <div className='text-4xl flex justify-center items-center h-full'>
            {emoji}
          </div>
        </ContainerIcon>
      </button>
    </>
  )
}
