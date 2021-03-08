import React, { FunctionComponent } from 'react'

interface ContainerIconProps {
  classes: string
}

export const ContainerIcon: FunctionComponent<ContainerIconProps> = ({ classes, children }) => (
  <div className={`w-16 h-16 shadow-md rounded-md ${classes}`}>
    {children}
  </div>
)
