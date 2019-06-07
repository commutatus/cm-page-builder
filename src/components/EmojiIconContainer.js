import React from 'react'
import EmojiPicker from 'emoji-picker-react'
import JSEMOJI from 'emoji-js';
import '../styles/components/Emoji.css';

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

  onEmojiClick = (data, object, e) => {
    this.elem.innerHTML = this.jsemoji.replace_colons(`:${object.name}:`)
  }
  
  toggleEmojiPopup = (e) => {
    this.setState({showPopup: !this.state.showPopup})
  }

  render() {
    let {showPopup} = this.state
    return(
      <div className="cm-emoji-container" onClick={this.toggleEmojiPopup}>
        <div style={{fontSize: '75px'}} ref={node => this.elem = node}></div>
        {
          showPopup &&
          <EmojiPicker onEmojiClick={this.onEmojiClick}/>
        }
      </div>
    )
  }
}