function download(img) {
  var a = document.createElement('a')
  a.href = img
  a.download = 'bg-img'
  a.click()
}

function parse(bgVal) {
  var m = bgVal.match(/url\("(.*)"\)/)
  if(m && m[1]) {
    return m[1]
  }

  if(bgVal.indexOf('data:image') === 0) {
    return bgVal
  }

  // duno.. maybe 'gradient..' or something?
  return null
}

var rightClickedTarget = null

chrome.runtime.onMessage.addListener((eName) => {
  if(eName === 'downloadbg' && rightClickedTarget) {
    var curr = rightClickedTarget
    var bg = ''
    do {
      bg = window.getComputedStyle(curr).backgroundImage
      if(!bg || bg === 'none') continue

      var img = parse(bg)
      if (img) {
        download(img)
        // continue or no? maybe there's moar
      }
    } while(curr = curr.parentElement)
  }
})

window.addEventListener('contextmenu', (e) => {
  rightClickedTarget = e.target
})
