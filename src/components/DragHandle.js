import React from 'react';
import { CSSTransition } from 'react-transition-group';
import {connect} from 'react-redux'
import { removeComponent } from "../redux/reducers/appDataReducers";
import { PermissionContext } from "../contexts/permission-context"
import styles from "./../styles/components/DragHandle.module.css"
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

class DragHandle extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      showMoreOptions: false
    }
  }

  componentDidUpdate(){
    if(this.state.showMoreOptions){
      window.addEventListener('click', this.closeHandle)
    }else{
      window.removeEventListener('click', this.closeHandle)
    }
    DragHandle.contextType = PermissionContext
  }

  closeHandle = (e) => {
    let elemHandle = document.getElementById('drag-handle')
    if(elemHandle && !elemHandle.contains(e.target)){
      this.setState({showMoreOptions: false})
    }
  }

  optionHandleClick = (e) => {
    e.stopPropagation()
    e.preventDefault()
    this.setState({showMoreOptions: !this.state.showMoreOptions})
  }

  componentWillUnmount(){
    window.removeEventListener('click', this.closeHandle)
  }

  handleClick = (e) => {
    switch (e.target.dataset.action) {
      case 'delete':
        this.props.removeComponent({blockId: this.props.id})
        break;
      default:
        break;
    }
  }


  render(){
    return(
      <div
        id="drag-handle"
        className={cx("component-dragger")}
        data-block-id={this.props.id}
        onClick={this.optionHandleClick}
        onMouseUp={(e) => e.stopPropagation()}
        style={{cursor: 'grab'}}
      >
        <div
          className={cx("delete-btn")}
          onMouseDown={(e) => e.stopPropagation()}
          onMouseUp={(e) => e.stopPropagation()}
          onClick={(e) => {e.stopPropagation(); this.props.removeComponent({blockId: this.props.id})}}
        >
            <i className={cx("cm-icon-trash")} />
        </div>
        <span className={cx("handle-icon")}><i className={cx("cm cm-icon-handle")} /></span>
        <CSSTransition
          in={this.state.showMoreOptions}
          timeout={300}
          classNames="cm-p-builder-fade"
          unmountOnExit
        >
          <React.Fragment>
            {
              this.state.showMoreOptions &&
              <div className={cx("showmore-popup")} onClick={this.handleClick}>
                <div data-action="delete" className={cx("more-option")}>
                <span><i className={cx("cm-icon-trash")} /></span>
                <span>Delete</span>
                </div>
              </div>
            }
          </React.Fragment>
        </CSSTransition>
      </div>
    )
  }
}

const mapDispatchToProps = {
  removeComponent
}

export default connect(state => state, mapDispatchToProps)(DragHandle)