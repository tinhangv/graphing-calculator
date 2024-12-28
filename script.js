//elements 
let cnv = document.getElementById('c')
let ctx = cnv.getContext('2d')
let funcIn = document.getElementById('f')
let select = document.getElementById('relation')
let addBtn = document.getElementById('add-btn')
let colour = document.getElementById('colour')

let xMinIn = document.getElementById('x-min-in')
let xMaxIn = document.getElementById('x-max-in')
let xSclIn = document.getElementById('x-scl-in')

let yMinIn = document.getElementById('y-min-in')
let yMaxIn = document.getElementById('y-max-in')
let ySclIn = document.getElementById('y-scl-in')

let inpVal = document.getElementById('inpVal')
let outVal = document.getElementById('outVal')
let evalRel = document.getElementById('evalRel')
let funcListIndex = document.getElementById('funcListIndex')

let errorEl = document.getElementById('error')

let dispFuncsEl = document.getElementById('dispFuncs')

//graph variables
let x, y, pxWidth, pxHeight, xAxis, yAxis
let func = {
  list: [],
  colour: [],
  rel: []
}
//initialize graph window
cnv.width = 700
cnv.height = 700
background('white')
updateGraph()

//functions: updateGraph, updateVariables, drawAxes, drawScale, shade, evaluateValue, resetWindow, updateMousePos, addFunction, removeFunc, toggleDispF, wheel, mousemove, mousedown, mouseup
function updateGraph() {
  // Clear the canvas to erase previous frame
  ctx.clearRect(0, 0, cnv.width, cnv.height);
  //clear error message
  errorEl.style.display = 'none'

  updateVariables()

  if (x.min >= x.max || y.min >= y.max) { //error message
    errorEl.style.display = 'block'
  } else {
    drawAxes()
    drawScale()
    dispFuncsEl.innerHTML = ''
    for (var i = 0; i < func.list.length; i++) {
      drawFunction(func.list[i], func.colour[i], func.rel[i])
      dispFuncsEl.innerHTML += (i + 1) + ':  f' + (i + 1) + '(x) ' + func.rel[i] + ' ' + func.list[i] + '  , colour:' + func.colour[i] + '<br>'
    }
    drawFunction(funcIn.value, colour.value, select.value)
  }
  evaluateValue()
}

function updateVariables() {
  x = {
    min: +xMinIn.value,
    max: +xMaxIn.value,
    scl: +xSclIn.value
  }
  y = {
    min: +yMinIn.value,
    max: +yMaxIn.value,
    scl: +ySclIn.value
  }
  if (document.getElementById('autoScale').checked == true) {
    x.scl = 10 ** Math.floor(Math.log(x.max - x.min) / Math.log(10) - 1)
    y.scl = 10 ** Math.floor(Math.log(y.max - y.min) / Math.log(10) - 1)
    xSclIn.value = x.scl
    ySclIn.value = y.scl
  }
  pxWidth = (x.max - x.min) / cnv.width
  pxHeight = (y.max - y.min) / cnv.height
  xAxis = (y.max / pxHeight)
  yAxis = -(x.min / pxWidth)

}

function drawAxes() {
  //draw axes
  line(yAxis, 0, yAxis, cnv.width)
  line(0, xAxis, cnv.height, xAxis)
}

function drawScale() {
  //draw scale lines
  if (x.scl != 0) {
    for (var j = yAxis + (Math.floor(x.min / x.scl) - 1) * x.scl / pxWidth; j <= cnv.width; j += x.scl / pxWidth) {
      if (j == yAxis) continue
      line(j, xAxis + 3, j, xAxis - 3)
    }
  }
  if (y.scl != 0) {
    for (var k = xAxis - (Math.floor(y.max / y.scl) + 1) * y.scl / pxHeight; k <= cnv.height; k += y.scl / pxHeight) {
      if (k == xAxis) continue
      line(yAxis - 3, k, yAxis + 3, k)
    }
  }
}

function drawFunction(func, colour, rel) {
  // let f = (x) => eval(func) 
  var f = Function('x', `return ${func}`)
  
  for (var i = 0; i < cnv.width; i++) {
    let x1 = i
    let y1 = f(x.min + i * pxWidth)
    let x2 = i + 1
    let y2 = f(x.min + (i + 1) * pxWidth)
    y1 = xAxis - y1 / pxHeight
    y2 = xAxis - y2 / pxHeight
    //function line
    stroke(colour); fill(colour);
    //dashed line
    if (rel == '<' || rel == '>') {
      if (Math.floor(x1 / (cnv.width / 50)) % 2 == 0) {
        line(x1, y1, x2, y2)
      }
    } else { //solid line
      line(x1, y1, x2, y2)
    }
    //shade inequalities
    if (y1 > cnv.height) y1 = cnv.height //prevent large values not shading in
    else if (y1 < 0) y1 = 0
    if (y2 > cnv.height) y2 = cnv.height
    else if (y2 < 0) y2 = 0
    if (rel == '<' || rel == '≤') {
      shade(x1, y1, x2, y2, x2, cnv.height, x1, cnv.height)
    } else if (rel == '>' || rel == '≥') {
      shade(x1, y1, x2, y2, x2, 0, x1, 0)
    }
    stroke('black'); fill('black');
  }
}
function shade(x1, y1, x2, y2, x3, y3, x4, y4) {
  ctx.globalAlpha = 0.5
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.lineTo(x3, y3);
  ctx.lineTo(x4, y4);
  ctx.closePath()
  ctx.fill()
  ctx.globalAlpha = 1
}

function evaluateValue() {
  // function f(x) {
  //   if(funcListIndex.value == '') return eval(funcIn.value)
  //   return eval(func.list[Number(funcListIndex.value) - 1])
  // }
  if(funcListIndex.value == ''){
    var f = Function('x', `return ${funcIn.value}`)
  } else{
    var f = Function('x', `return ${func.list[+funcListIndex.value - 1]}`)
  } 

  // change '=' to '<' , '>', etc.
  if (+funcListIndex.value <= func.list.length && funcListIndex.value != '') evalRel.innerText = func.rel[+funcListIndex.value - 1]
  else if (funcListIndex.value == '') evalRel.innerText = select.value
  else evalRel.innerText = '='
  //output value
  if (inpVal.value != '') {
    outVal.innerHTML = f(+inpVal.value)
    fill('red')
    circle(yAxis + +inpVal.value / pxWidth, xAxis - f(+inpVal.value) / pxHeight, 2, 'fill')
    fill('black')
  } else {
    outVal.innerHTML = 'value'
  }
}

addBtn.addEventListener('click', function addFunction() {
  func.list.push(funcIn.value)
  funcIn.value = ''
  if (colour.value == '') func.colour.push('black')
  else func.colour.push(colour.value)
  colour.value = ''
  func.rel.push(select.value)
  updateGraph()
})
function removeFunc() {
  let removeIndex = +document.getElementById('deleteFunc').value - 1
  if (removeIndex != '') {
    func.list.splice(removeIndex, 1)
    func.colour.splice(removeIndex, 1)
    func.rel.splice(removeIndex, 1)
  } else {
    func.list.pop()
    func.colour.pop()
    func.rel.pop()
  }
  updateGraph()
}
function toggleDispF() {
  if (document.getElementById('toggleText').innerHTML == 'Hide') {
    dispFuncsEl.style.display = 'none'
    document.getElementById('toggleText').innerHTML = 'Show'
  } else {
    dispFuncsEl.style.display = 'block'
    document.getElementById('toggleText').innerHTML = 'Hide'
  }
}
function resetWindow() {
  xMinIn.value = '-10'
  xMaxIn.value = '10'
  xSclIn.value = '1'
  yMinIn.value = '-10'
  yMaxIn.value = '10'
  ySclIn.value = '1'
  updateGraph()
}

//mouse click
let mousedown = false
document.addEventListener('mousedown', mousedownHandler);
document.addEventListener('mouseup', mouseupHandler);
function mousedownHandler(event) {
  mousedown = true;
}
function mouseupHandler(event) {
  mousedown = false;
}
//dectect mouse movements
let mouseX = 0
let mouseY = 0
function updateMousePos(event) {
  let canvrect = cnv.getBoundingClientRect()
  mouseX = event.clientX - canvrect.left;
  mouseY = event.clientY - canvrect.top;
  mouseX = x.min + mouseX * pxWidth
  mouseY = y.max - mouseY * pxHeight
  document.getElementById('cord').innerHTML = '(' + mouseX.toFixed(Math.max(2, -Math.floor(Math.log10(x.scl)) + 2)) + ',' + mouseY.toFixed(Math.max(2, -Math.floor(Math.log10(y.scl)) + 2)) + ')'
}
cnv.addEventListener('mousemove', function (event) {
  if (mousedown) {
    xMaxIn.value = x.max - event.movementX * pxWidth
    xMinIn.value = x.min - event.movementX * pxWidth
    yMaxIn.value = y.max + event.movementY * pxHeight
    yMinIn.value = y.min + event.movementY * pxHeight
    updateGraph()
  }
  updateMousePos(event)
})

cnv.addEventListener('wheel', function (event) {
  event.preventDefault()
  updateMousePos(event)
  let zoomFactor = 1.15
  if (event.deltaY > 0) { //zoom out
    xMinIn.value = mouseX - (mouseX - x.min) * zoomFactor
    xMaxIn.value = mouseX + (x.max - mouseX) * zoomFactor
    yMinIn.value = mouseY - (mouseY - y.min) * zoomFactor
    yMaxIn.value = mouseY + (y.max - mouseY) * zoomFactor
  } else if (event.deltaY < 0) { //zoom in
    xMinIn.value = mouseX - (mouseX - x.min) / zoomFactor
    xMaxIn.value = mouseX + (x.max - mouseX) / zoomFactor
    yMinIn.value = mouseY - (mouseY - y.min) / zoomFactor
    yMaxIn.value = mouseY + (y.max - mouseY) / zoomFactor
  }
  updateGraph()
})
