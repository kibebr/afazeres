import React from 'react'
import { Textarea } from './Textarea'
import { Checkbox } from './Checkbox'

interface AfazerComponentProps {
  content: string
  onChangeContent: (newContent: string) => unknown
}

export const AfazerComponent = ({ content, onChangeContent }: AfazerComponentProps): JSX.Element => (
  <div className='flex items-center space-x-2 flex-row w-full'>
    <Checkbox onCheck={() => undefined} />
    <Textarea
      maxRows={5}
      defaultValue={content}
      className='w-full'
      onChange={({ target }) => onChangeContent(target.value)}
      />
  </div>
)
