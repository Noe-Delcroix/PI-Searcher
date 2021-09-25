var pi, myFont
var pos = 0
var vel = 0
const fontsz = 300
var space

function preload() {
  myFont = loadFont('dealerplate california.ttf')
  pi = loadStrings('pi 1million.txt')
}

function setup() {
  pi = pi[0].slice()
  space = myFont.textBounds('8', 0, 0, fontsz).h
  createCanvas(windowWidth, space)
  searchBar = createInput()
  searchBar.class('css-input')
  searchBar.position(width / 2 - 200 / 2, height)
  searchBar.input(limitCharacters)
  txt = createDiv('')
  txt.class('txt')
  txt.position(0, height + 50)
  txt.style('width', width + 'px')

  space = myFont.textBounds('8', 0, 0, fontsz).w
}

function draw() {
  background(0)
  fill(0, 224, 115, 150)
  rectMode(CENTER)
  noStroke()
  let desired
  let index = pi.slice(2).indexOf(searchBar.value())
  if (searchBar.value().length == 0 || index < 0) {
    if (mouseIsPressed && mouseY < height) {
      this.vel = (pmouseX - mouseX) / 10
    } else {
      this.vel *= 0.95
    }
    pos += vel
    pos = constrain(pos, 0, pi.length)
    if (searchBar.value().length == 0) {
      txt.html('Please enter a sequence of numbers that you want to find in pi. Drag to scroll. You are at decimal ' + constrain(floor(pos - 0.5), 0, pi.length))
    } else {
      txt.html('"' + searchBar.value() + '" was not found in the first 1 million decimals of pi')
    }

  } else {
    txt.html('"' + searchBar.value() + '" was found at position ' + str(index + 1) + ' in pi')
    desired = index + 2 + (searchBar.value().length - 1) / 2
    fill(18, 201, 115)
    noStroke()
    rectMode(CENTER)
    rect(width / 2, height / 2, map(constrain(abs(desired - pos), 0, 10), 0, 10, searchBar.value().length * (space + 10), 0), height)
    pos += (desired - pos) / 5
  }
  renderPi(pos)
  stroke(255)
  strokeWeight(5)
  line(width / 2, 0, width / 2, height)
}

function renderPi(fx) {
  fill(255, 200)
  noStroke()
  textFont(myFont)
  textSize(fontsz)
  textAlign(CENTER, CENTER)
  let xpos = width / 2 - (fx - floor(fx)) * space * 1.15
  let letter = int(fx)
  while (letter >= 0 && xpos > -space / 2) {
    text(pi[letter], xpos, height / 2)
    xpos -= space + 10
    letter--
  }
  xpos = width / 2 - (fx - floor(fx)) * space * 1.15
  letter = int(fx)
  while (letter < pi.length && xpos < width + space / 2) {
    xpos += space + 10
    letter++
    text(pi[letter], xpos, height / 2)
  }
}

function keyPressed() {
  if (keyCode == 8) {
    searchBar.value('')
  }
}

function limitCharacters(){
  let c=searchBar.value()
  let char='0123456789'
  if (char.indexOf(c[c.length-1])==-1){
    searchBar.value(c.substring(0,c.length-1))
  }
}