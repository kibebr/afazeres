import React, { forwardRef, FocusEventHandler, ChangeEventHandler } from 'react'
import TextareaAutosize from 'react-textarea-autosize'

interface TextareaProps {
  value?: string
  maxRows?: number
  className?: string
  defaultValue?: string
  onBlur?: FocusEventHandler<HTMLTextAreaElement>
  onChange?: ChangeEventHandler<HTMLTextAreaElement>
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({ value, defaultValue, maxRows, className, onBlur, onChange }, ref) => (
  <TextareaAutosize
    ref={ref}
    maxRows={maxRows}
    value={value}
    defaultValue={defaultValue}
    className={`transition-height resize-none bg-gray-100 rounded-md p-2 focus:ring-2 ring-gray-200 hover:ring-1 ${className ?? ''}`}
    onChange={onChange}
    onBlur={onBlur}
  />
))
