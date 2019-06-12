import React from 'react'
import EmojiPicker from 'emoji-picker-react'
import JSEMOJI from 'emoji-js';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import '../styles/components/Emoji.css';
import { PermissionContext } from '../contexts/permission-context';

export class EmojiIconContainer extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      showPopup: false
    }
    this.jsemoji = new JSEMOJI();
    this.jsemoji.img_sets.emojione.path = 'https://cdn.jsdelivr.net/gh/iamcal/emoji-data@19299c91bc87374118f06b2760f1ced69d714ab1/img-emojione-64/';
  }

  componentDidMount(){
    this.elem.innerHTML = this.jsemoji.replace_colons(`:smile:`)
  }

  onEmojiClick = (data, e) => {
    e.preventDefault()
    this.elem.innerHTML = this.jsemoji.replace_colons(data.colons)
  }
  
  openEmojiPopup = (e) => {
    if(!this.state.showPopup){
      this.setState({showPopup: true})
      document.addEventListener('click', this.closeEmojiPopup)
    }
  }

  closeEmojiPopup = (e) => {
    if(!this.rootNode.contains(e.target)){
      this.setState({showPopup: false})
      document.removeEventListener('click', this.closeEmojiPopup)
    }
  }

  render() {
    let {showPopup} = this.state
    return(
      <PermissionContext.Consumer>
        {
          value =>{
            return(
              <div 
                className="cm-emoji-container" 
                onClick={value.status === 'Edit' ? this.openEmojiPopup : undefined} 
                ref={node => this.rootNode = node}
              >
                <div style={{fontSize: '75px'}} ref={node => this.elem = node}></div>
                {
                  showPopup &&
                  <Picker set='emojione' onClick={this.onEmojiClick}/>
                }
              </div>
            )
          }
        }
      </PermissionContext.Consumer>
    )
  }
}