import React, { useState } from 'react'
import '../styles/components/Divider.css'
import { PermissionContext } from '../contexts/permission-context';
import DragHandle from './DragHandle'
export const Divider = (props) => {
  return(
    <PermissionContext.Consumer>
    {
      value => 
      <div className={`component-section ${value.status.toLowerCase()}`}>
        <div className={`divider ${value.status.toLowerCase()}`}>
          <div className="sperator"></div>
        </div>
      </div>

    }
  </PermissionContext.Consumer>
  )
}
  