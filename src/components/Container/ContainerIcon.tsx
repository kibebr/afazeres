import React from 'react'

interface ContainerIconProps {
  classes: string
}

export const ContainerIcon = ({ classes }: ContainerIconProps): JSX.Element => (
  <div className={`w-16 h-16 shadow-md rounded-md ${classes}`}>
  </div>
)
