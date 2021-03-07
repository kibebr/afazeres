import React from 'react'

interface AfazeresContainerIconProps {
  classes: string
}

export const AfazeresContainerIcon = ({ classes }: AfazeresContainerIconProps): JSX.Element => (
  <div className={`w-16 h-16 shadow-md rounded-md ${classes}`}>
  </div>
)
