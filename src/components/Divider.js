import React, { useState } from 'react'
import '../styles/components/Divider.css'
import { PermissionContext } from '../contexts/permission-context';
import DragHandle from './DragHandle'
export const Divider = (props) => {
  // const [showMoreOptions, setState] = useState(false)
  return(
    <PermissionContext.Consumer>
    {
      value => 
      <div className="component-section">
        {
          value.status === `Edit`
          &&
          <DragHandle handleAction={value.handleAction} id={props.id} /> 
        }
        <div className={`divider ${value.status.toLowerCase()}`}>
          <div className="sperator"></div>
        </div>
      </div>

    }
  </PermissionContext.Consumer>
  )
}
  