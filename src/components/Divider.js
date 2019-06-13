import React, { useState } from 'react'
import '../styles/components/Divider.css'
import { PermissionContext } from '../contexts/permission-context';

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
          <div className="component-dragger" onClick={(e) => props.optionHandleClick(e, value.handleAction)}><i className="cm cm-handle" />
            {/* {
              showMoreOptions &&
              <div onMouseUp={(e) => e.stopPropagation()}>test</div>
            } */}
          </div>
        }
        <div className={`divider ${value.status.toLowerCase()}`}>
          <div className="sperator"></div>
        </div>
      </div>

    }
  </PermissionContext.Consumer>
  )
}
  