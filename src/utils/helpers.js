
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