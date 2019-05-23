import React from 'react'
import '../styles/components/Emoji.css';

export class EmojiIconContainer extends React.Component{
  render() {
    return(
      <div className="cm-emoji-container">
        <img src={"http://thecraftchop.com/files/others/emojiwbow.svg"} />
      </div>
    )
  }
}