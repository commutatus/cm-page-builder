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