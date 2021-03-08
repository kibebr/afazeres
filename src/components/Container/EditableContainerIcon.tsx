import React, { useState, MouseEvent } from 'react'
import { ContainerIcon } from './ContainerIcon'
import Picker, { IEmojiData } from 'emoji-picker-react'

interface EditableContainerIconProps {
  classes: string
  defaultEmoji: string
  onSelectNewEmoji: (e: string) => unknown
}

export const EditableContainerIcon = ({ onSelectNewEmoji, defaultEmoji, classes }: EditableContainerIconProps): JSX.Element => {
  const [emoji, setEmoji] = useState<string>('')
  const [emojiPickerVisible, setEmojiPickerVisible] = useState<boolean>(false)

  const handleEmojiClick = (_: MouseEvent, { emoji }: IEmojiData): void => {
    setEmojiPickerVisible(false)
    setEmoji(emoji)
    onSelectNewEmoji(emoji)
  }

  return (
    <>
      {emojiPickerVisible && (
        <div className='absolute'>
          <Picker onEmojiClick={handleEmojiClick} />
        </div>
      )}
      <div onClick={(): void => setEmojiPickerVisible((b) => !b)}>
        <ContainerIcon classes={classes}>
          <div className='text-4xl flex justify-center items-center h-full'>
            {emoji}
          </div>
        </ContainerIcon>
      </div>
    </>
  )
}
