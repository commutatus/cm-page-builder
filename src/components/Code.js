import React from 'react';
import hljs from 'highlight.js/lib/core';
import 'highlight.js/styles/github.css';
import '../styles/Code.css'
import { PermissionContext } from '../contexts/permission-context';
import classNames from 'classnames';
import _ from 'lodash'
import { connect } from 'react-redux';

const SUPPORTED_LANGUAGES = [
  'JavaScript',
  'JSON',
  'Bash',
  'C',
  'C#',
  'C++',
  'CSS',
  'CoffeeScript',
  'Dockerfile',
  'HTML, XML',
  'Java',
  'Markdown',
  'PHP',
  'Plaintext',
  'Python',
  'R',
  'Ruby',
  'SCSS',
  'Shell',
  'Scala',
  'SQL',
  'Swift',
  'TypeScript',
  'VB.Net',
]

const DEFAULT_LANG = 'javascript'

class CodeBlock extends React.Component {
  constructor(props) {
    super(props);
    this.registerLang(DEFAULT_LANG)
    this.state = {
      code: 'a = 10',
      selectedLang: DEFAULT_LANG
    }
    CodeBlock.contextType = PermissionContext
  }

  registerLang(lang){
    hljs.registerLanguage(
      lang, 
      require(`highlight.js/lib/languages/${lang}`)
    );
  }

  componentWillReceiveProps(newProps){
    if(newProps.currentElem.elemId === newProps.id){
      this.highlighterNode.focus()
    }
  }

  componentDidUpdate(oldProps, oldState){
    if(
      this.state.code !== oldState.code &&
      this.state.selectedLang === oldState.selectedLang
    ){
      if(this.oldRange)
        this.restoreSelection(this.highlighterNode, this.oldRange)
    }
  }

  handleChange = (e) => {
    e.stopPropagation()
    const text = e.target.innerText
    if(text[text.length-1] !== '\n'){
      this.saveSelection(this.highlighterNode)
      this.setState(state => ({code: text}))
    }
  }

  saveSelection = (containerEl) => {
    if(window.getSelection && document.createRange){
      let range = window.getSelection().getRangeAt(0);
      let preSelectionRange = range.cloneRange();
      preSelectionRange.selectNodeContents(containerEl);
      preSelectionRange.setEnd(range.startContainer, range.startOffset);
      let start = preSelectionRange.toString().length;

      this.oldRange = {
          start: start,
          end: start + range.toString().length
      };
    }else{
      let doc = containerEl.ownerDocument, win = doc.defaultView || doc.parentWindow;
      let selectedTextRange = doc.selection.createRange();
      let preSelectionTextRange = doc.body.createTextRange();
      preSelectionTextRange.moveToElementText(containerEl);
      preSelectionTextRange.setEndPoint("EndToStart", selectedTextRange);
      let start = preSelectionTextRange.text.length;

      return {
          start: start,
          end: start + selectedTextRange.text.length
      };
    }
  }

  restoreSelection = (containerEl, savedSel) => {
    if(window.getSelection && document.createRange){
      let doc = containerEl.ownerDocument, win = doc.defaultView;
      let charIndex = 0, range = doc.createRange();
      range.setStart(containerEl, 0);
      range.collapse(true);
      let nodeStack = [containerEl], node, foundStart = false, stop = false;
      
      while (!stop && (node = nodeStack.pop())) {
          if (node.nodeType == 3) {
              let nextCharIndex = charIndex + node.length;
              if (!foundStart && savedSel.start >= charIndex && savedSel.start <= nextCharIndex) {
                  range.setStart(node, savedSel.start - charIndex);
                  foundStart = true;
              }
              if (foundStart && savedSel.end >= charIndex && savedSel.end <= nextCharIndex) {
                  range.setEnd(node, savedSel.end - charIndex);
                  stop = true;
              }
              charIndex = nextCharIndex;
          } else {
              let i = node.childNodes.length;
              while (i--) {
                  nodeStack.push(node.childNodes[i]);
              }
          }
      }

      var sel = win.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    }else{
      let doc = containerEl.ownerDocument, win = doc.defaultView || doc.parentWindow;
      let textRange = doc.body.createTextRange();
      textRange.moveToElementText(containerEl);
      textRange.collapse(true);
      textRange.moveEnd("character", savedSel.end);
      textRange.moveStart("character", savedSel.start);
      textRange.select();
    }
  };

  handleLangChange = (e) => {
    let selectedLang = e.target.value
    this.registerLang(selectedLang)
    this.setState({selectedLang})
  }

  render() {
    const {code, selectedLang} = this.state
    const {context} = this
    
    return (
      <div className={classNames("cm-code-block", context.status.toLowerCase())}>
        <pre className={classNames('hljs')}>
          <code>
            <div 
              style={{width: '100%'}}
              contentEditable={true} 
              onInput={this.handleChange}
              ref={node => this.highlighterNode = node}
              dangerouslySetInnerHTML={{__html: `${hljs.highlight(selectedLang, code).value}`}} 
              onSelect={e => e.stopPropagation()}
            />
          </code>
        </pre>
        
        <select onChange={this.handleLangChange}>
          {
            SUPPORTED_LANGUAGES.map(lang => {
              return (
                <option 
                  key={lang}
                  value={lang.toLowerCase()} 
                  {...(selectedLang === lang.toLowerCase() ? ["selected"] : '')}
                >
                  {lang}
                </option>
              )
            })
          }
        </select>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentElem: state.currentElem
})


export const Code = connect(mapStateToProps)(CodeBlock)