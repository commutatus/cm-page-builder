import React from 'react';
import { CSSTransition } from 'react-transition-group';
import '../styles/components/DragHandle.css';

export default class DragHandle extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      showMoreOptions: false
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
        this.props.handleAction('remove-component', this.props.id)
        break;
    
      default:
        break;
    }
  }


  render(){
    return(
      <div className="component-dragger" onClick={this.optionHandleClick}>
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