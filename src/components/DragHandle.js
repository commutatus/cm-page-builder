import React from 'react';
import { CSSTransition } from 'react-transition-group';
import '../styles/components/DragHandle.css';
import {connect} from 'react-redux'
import { removeComponent } from "../redux/reducers/appDataReducers";
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
        className="component-dragger" 
        data-block-id={this.props.id}
        onClick={this.optionHandleClick} 
      >
        <i className="cm cm-handle" />
        <CSSTransition
          in={this.state.showMoreOptions}
          timeout={300}
          classNames="fade"
          unmountOnExit
        >
          <React.Fragment>
            {
              this.state.showMoreOptions &&
              <div className="showmore-popup" onClick={this.handleClick}>
                <div data-action="delete" className="more-option">
                <span><i className="cm-trash" /></span>
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