import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export class CodeHighlighter extends React.Component{
  render(){
    const codeString = '(num) => num + 1';
    return (
      <SyntaxHighlighter language="javascript" style={dark} onFocus={e => {e.preventDefault(); e.stopPropagation()}}>
        {codeString}
      </SyntaxHighlighter>
    );
  }
}
