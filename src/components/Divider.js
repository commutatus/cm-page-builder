import React from 'react'
import '../styles/components/Divider.css'
import { PermissionContext } from '../contexts/permission-context';

export const Divider = (props) => 
  <PermissionContext.Consumer>
    {
      value => 
      <div className={`divider ${value.status.toLowerCase()}`}>
        <div className="sperator"></div>
      </div>
    }
  </PermissionContext.Consumer>