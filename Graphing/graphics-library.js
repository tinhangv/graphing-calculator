//Function List:
// canvasSize(width, height)
// background(color)
// stroke(color)
// fill(color)
// lineWidth(width)
// font(fontSetting)
// rect(x, y, w, h, mode)
// line(x1, y1, x2, y2)
// circle(x, y, r, mode)
// triangle(x1, y1, x2, y2, x3, y3, mode)
// text(message, x, y, mode)
// ellipse(x, y, xRadius, yRadius, rotation, mode)
// image(imgId, x, y, w, h)

//global variables
// let cnv = document.getElementById('c')
// let ctx = cnv.getContext('2d')

// canvasSize(width, height): Sets the height and width of the canvas
function canvasSize(width, height) {
  ctx.width = width
  ctx.height = height
}
// background(color); Sets the background color of the canvas.
function background(color) {
  cnv.style.background = color
}
// stroke(color): Sets the stroke color.
function stroke(color) {
  ctx.strokeStyle = color
}
// fill(color): Sets the fill color.
function fill(color) {
  ctx.fillStyle = color
}
// lineWidth(width): Sets the line width.
function lineWidth(width) {
  ctx.lineWidth = width
}
// font(fontSetting): Sets the font family. Reference: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/font
function font(fontSetting) {
  ctx.font = fontSetting
}
// rect(x, y, w, h, mode): Draws a rectangle. Mode will be stroke or fill.
function rect(x, y, w, h, mode) {
  if (mode == 'fill') {
    ctx.fillRect(x, y, w, h)
  } else if (mode == 'stroke') {
    ctx.strokeRect(x, y, w, h)
  }
}
// line(x1, y1, x2, y2): Draws a line.
function line(x1, y1, x2, y2) {
  ctx.beginPath()
  ctx.moveTo(x1, y1)
  ctx.lineTo(x2, y2)
  ctx.stroke()
}
// circle(x, y, r, mode): Draws a circle. Mode will be stroke or fill.
function circle(x, y, r, mode) {
  ctx.beginPath()
  ctx.arc(x, y, r, 0, 2 * Math.PI)
  if (mode == 'fill') {
    ctx.fill()
  } else if (mode == 'stroke') {
    ctx.stroke()
  }
}
// triangle(x1, y1, x2, y2, x3, y3, mode). Draws a triangle.  Mode will be stroke or fill.
function triangle(x1, y1, x2, y2, x3, y3, mode) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.lineTo(x3, y3);
  ctx.closePath()
  if (mode == 'fill') {
    ctx.fill()
  } else if (mode == 'stroke') {
    ctx.stroke()
  }
}
// text(message, x, y, mode): Draws text. Mode will be stroke or fill. Reference: https://www.w3schools.com/graphics/canvas_text.asp
function text(message, x, y, mode) {
  if (mode == 'fill') {
    ctx.fillText(message, x, y)
  }else if (mode == 'stroke'){
    ctx.strokeText(message, x, y)
  }
}
// ellipse(x, y, xRadius, yRadius, rotation, mode): Draws an ellipse. Reference: https://reference.codeproject.com/book/dom/CanvasRenderingContext2D/
function ellipse(x,y,xRadius, yRadius, rotation, mode){
  ctx.ellipse(x,y,xRadius, yRadius, rotation, 0, 2*Math.PI)
  if(mode == 'stroke'){
    ctx.stroke()
  }else if (mode == 'fill'){
    ctx.fill()
  }
}
// image(img, x, y, w, h). Draws an image. Reference: https://www.w3schools.com/graphics/canvas_images.asp
function image(imgId, x, y, w, h){
  ctx.drawImage(document.getElementbyId(imgId), x, y, w, h)
}
