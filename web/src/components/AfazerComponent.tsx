import React from 'react'
import { Textarea } from './Textarea'

interface AfazerComponentProps {
  content: string
  onChangeContent: (newContent: string) => unknown
}

export const AfazerComponent = ({ content, onChangeContent }: AfazerComponentProps): JSX.Element => (
  <Textarea
    maxRows={5}
    defaultValue={content}
    onChange={({ target }) => onChangeContent(target.value)}
  />
)
