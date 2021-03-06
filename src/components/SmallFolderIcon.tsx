import React, { FunctionComponent } from 'react'

interface SmallFolderIconProps {
  color: string
}

export const SmallFolderIcon: FunctionComponent<SmallFolderIconProps> = ({ color }) => (
  <div className={`w-7 h-7 bg-white rounded-md shadow-md ${color}`}>
  </div>
)
