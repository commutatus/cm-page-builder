import React from 'react';
import hljs from 'highlight.js/lib/core';
import 'highlight.js/styles/github.css';
import '../styles/Code.css'
import { PermissionContext } from '../contexts/permission-context';
import classNames from 'classnames';
import _ from 'lodash'
import { connect } from 'react-redux';
import {
  updateComponent,
} from '../redux/reducers/appDataReducers'


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

hljs.configure({
  tabReplace: '\u00a0\u00a0\u00a0\u00a0',
  useBR: true
});

class CodeBlock extends React.Component {
  constructor(props) {
    super(props);
    this.registerLang(DEFAULT_LANG)
    this.state = {
      code: '',
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
    if(
      this.props.currentElem.id !== newProps.currentElem.id && 
      newProps.currentElem.elemId === newProps.id
    ){
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

  saveSelection = (containerEl, text) => {
    if(window.getSelection && document.createRange){
      let range = window.getSelection().getRangeAt(0);
      let preSelectionRange = range.cloneRange();
      preSelectionRange.selectNodeContents(containerEl);
      preSelectionRange.setEnd(range.startContainer, range.startOffset);
      let start = text.length

      this.oldRange = {
          start,
          end: start + range.toString().length
      };
    }else{
      let doc = containerEl.ownerDocument, win = doc.defaultView || doc.parentWindow;
      let selectedTextRange = doc.selection.createRange();
      let preSelectionTextRange = doc.body.createTextRange();
      preSelectionTextRange.moveToElementText(containerEl);
      preSelectionTextRange.setEndPoint("EndToStart", selectedTextRange);
      let start = preSelectionTextRange.text.length;

      this.oldRange = {
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


      let sel = win.getSelection();
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


  handleKeyUp = (e) => {
    switch(e.key){
      case 'Enter':
        this.oldRange = null
        break
      default:
        let text = e.target.innerText
        this.saveSelection(this.highlighterNode, text)
        this.setState(state => ({code: text}))
        break
    }
  }

  handleTab = e => {
    if(e.keyCode === 9){
      e.preventDefault();
      
      // handleTab spaces by inserting a no break node
      //for more info https://www.fileformat.info/info/unicode/char/00a0/index.htm
      let editor = this.highlighterNode
      let doc = editor.ownerDocument.defaultView;
      let sel = doc.getSelection();
      let range = sel.getRangeAt(0);

      let tabNode = document.createTextNode("\u00a0\u00a0\u00a0\u00a0");
      range.insertNode(tabNode);

      range.setStartAfter(tabNode);
      range.setEndAfter(tabNode); 
      sel.removeAllRanges();
      sel.addRange(range);
    }
  }

  handleBlur = (e) => {
    console.log(e.target)
    e.stopPropagation()
    this.props.updateComponent({id: this.props.id, newState: {content: this.state.code}})
  }

  render() {
    const {code, selectedLang} = this.state
    const {context} = this

    const actions = context.status === 'Edit' ? {
      onKeyDown: this.handleTab,
      onInput: this.handleChange,
      onKeyUp: this.handleKeyUp,
      onSelect: e => e.stopPropagation(),
      onBlur: this.handleBlur,
    } : {}
    
    return (
      <div className={classNames("cm-code-block", context.status.toLowerCase())}>
        <pre className={classNames('hljs')}>
          <code>
            <div 
              style={{width: '100%'}}
              contentEditable={context.status === 'Edit'}
              ref={node => this.highlighterNode = node}
              dangerouslySetInnerHTML={{__html: `${hljs.highlight(selectedLang, context.status === 'Edit' ? code : this.props.content).value}`}} 
              data-gramm_editor="false"
              {...actions}
            />
          </code>
        </pre>
        
        {
          context.status === 'Edit' && 
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
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentElem: state.currentElem
})

const mapDispatchToProps = {
  updateComponent
}


export const Code = connect(mapStateToProps, mapDispatchToProps)(CodeBlock)