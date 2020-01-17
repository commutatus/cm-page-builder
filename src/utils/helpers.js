import { ALLOWED_TAGS, TAGS_TO_COMPONENT_MAP, IS_INLINE_COMPONENT } from "./constant"

//Vimeo and youtube validator
export const getVideoUrl = (url) => {
	let videoid = url.replace(/(https{0,1}:\/\/){0,1}(www\.){0,1}((youtube.com\/{0,1}(watch\?v=){0,1})|(vimeo.com\/{0,1}))/g, "")
	if (url.includes('vimeo')) {
		return `//player.vimeo.com/video/${videoid}`
	}
	else if (url.includes('youtube')) {
		return `https://www.youtube.com/embed/${videoid}`
	}
	return ''
}

  // Method to position the cursor at the end of the content
export const setCursorToEnd = (e) => {
  var range = document.createRange();
  var sel = window.getSelection();
  if(e.target.innerHTML){
    range.setStart(e.target.lastChild, e.target.lastChild.length);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
  }
}

// convert url to dataUrl
export const toDataURL = (url, callback) =>  {
  let xhr = new XMLHttpRequest();
  xhr.onload = function() {
    let reader = new FileReader();
    reader.onloadend = function() {
      callback(reader.result);
    }
    reader.readAsDataURL(xhr.response);
  };
  xhr.open('GET', url);
  xhr.responseType = 'blob';
  xhr.send();
}


//sort pageComponents on the basis of pos
export function sortDataOnPos(data){
  let newData = []
  for(let i in data){
    newData[data[i].position-1] = data[i]
  }  
  return newData
}

// Method to retain the "AddComponents" without any data
export function compareAndDiff(newState, newData){        
  let data = []
  let i = 0, j = 0

  while(i < newState.length){
    if(newData[j]){
      if(newState[i].id === newData[j].id || 
          newState[i].content === newData[j].content ||
          (newData[j].component_attachment && newState[i].component_attachment && newState[i].component_attachment.filename === newData[j].component_attachment.filename)
      ){
        data.push({...newData[j], position: i+1})
        i++
        j++
      }
      else if (!newState[i].content) {            
        data.push({...newState[i], position: data.length})
        i++
      }
      else{
        data.push({...newState[i], position: i+1})
        data.push({...newData[j], position: i+2})
        i+=2
        j++
      }
    }else{
      data.push({...newState[i], position: i+1})
      i++
    }
  }
  return data
}

// Function to convert file sizes in bytes to KB, MB, GB, TB
export const bytesToSize = (bytes) => {
  var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes == 0) return '0 Byte';
  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}

//Check if a tag is allowed. All the tag are includes which are supported or will be converted to supported tags.
export const isAllowedTag = (tag, parentTag) => {
  if(parentTag === 'li' && ( tag === 'ul' || tag === 'li' || tag === 'ol')){
    return false
  }
  return ALLOWED_TAGS.includes(tag) || isHeaderTag(tag)
}

export const isHeaderTag = (tag) => {
  return ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']. includes(tag)
}

export const isTextTag = (tag) => {
  return [
    'p',
    'span',
    'strong',
    'b',
    'i',
    'em',
    'small',
    'strong',
    'strike'
  ].includes(tag) || isHeaderTag(tag)
}

// Check if a element is a inline element or not. Cannot be used to check if element is block or not.
export const isInlineElement = (tag) => {
  return IS_INLINE_COMPONENT.includes(tag)
}

//Accepts tag and parent tag and return respective components.
export const getComponentFromTag = (tag, parentTag) => {
  if(TAGS_TO_COMPONENT_MAP[tag]){
    return TAGS_TO_COMPONENT_MAP[tag]
  }
  else if(isTextTag(tag)){
    return 'Text'
  }
  else if(shouldUseParentTag(tag)){
    return TAGS_TO_COMPONENT_MAP[parentTag]
  }
  else{
    console.error(`Invalid tag: ${tag}`)
  }
}

// It takes dom object and converts it to a text.
export const convertObjectToText = (root) => {
  if(root.constructor.name === 'TextNode'){
    return root.rawText
  }else if(!root){
    return ''
  }
  return `<${root.tagName}${root.tagName === 'a' ? ` href="${root.attributes.href}"` : ''}>${root.childNodes.map(node => convertObjectToText(node)).join('')}</${root.tagName}>`
}

export const shouldUseParentTag = (tag) => {
  return ['li'].includes(tag)
}

//Block elements that are allowed to create a component
export const isTagAllowedToCreateComponent = (tag) => {
  return ['li', 'img', 'hr'].includes(tag) || isHeaderTag(tag)
}