import React from 'react';

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
    this.setState({showMoreOptions: true})
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
        {
          this.state.showMoreOptions &&
          <div onClick={this.handleClick}>
            <div data-action="delete">Delete</div>
          </div>
        }
      </div>
    )
  }
}