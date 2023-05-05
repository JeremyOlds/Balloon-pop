let startButton = document.getElementById("start-button")
let inflateButton = document.getElementById("inflate-button")

//#region game logic and data

  //DATA
  let clickCount = 0
  let height = 120
  let width = 100
  let inflationRate = 20
  let maxsize = 300
  let currentpopCount = 0
  let highestpopCount = 0
  let gameLength = 10000
  let clockId = 0
  let timeRemaining = 0
  let currentPlayer = {}
  let currentColor = "blue"
  let possibleColors = ["green, blue"]

  function startgame(){
  startClock()
  setTimeout(stopgame, gameLength);

  document.getElementById("gameControls").classList.remove("hidden")
  document.getElementById("menuControls").classList.add("hidden")
  document.getElementById("scoreboard").classList.add("hidden")

  }

  function startClock(){
  timeRemaining = gameLength
  drawClock()
  clockId = setInterval(drawClock, 1000);

  }

  function StopClock(){
  clearInterval(clockId)
}
  function drawClock(){
  let countdownElem = document.getElementById("countdown")
  countdownElem.innerText = (timeRemaining/1000).toString()
  timeRemaining -= 1000
  }

  function inflate(){
  clickCount++
  
  height += inflationRate
  width += inflationRate
  
checkBalloonPop()
draw()

}

function checkBalloonPop()
  {
  if(height >= maxsize){
    console.log("pop the balloon")
  currentpopCount++
  height = 0
  width = 0
  document.getElementById("pop-sound").play()
  }
}
  function draw(){
  let balloonElement = document.getElementById("balloon")
  let clickCountElem = document.getElementById("click-count")
  let popCountElem =  document.getElementById("pop-count")
  let highestpopCountElem = document.getElementById("highest-pop-count")

  let playerNameElem = document.getElementById("playerName")

  balloonElement.style.height = height + "px"
  balloonElement.style.width = width + "px"
  
  clickCountElem.innerText = clickCount.toString()
  popCountElem.innerText = currentpopCount.toString()
  highestpopCountElem.innerText = currentPlayer.topScore.toString()
  playerNameElem.innerText = currentPlayer.name
  }



  function stopgame(){
  console.log("game over")

  document.getElementById("menuControls").classList.remove("hidden")
  document.getElementById("gameControls").classList.add("hidden")
  document.getElementById("scoreboard").classList.remove("hidden")


  clickCount = 0
  height = 120
  width = 100

  if(currentpopCount > currentPlayer.topScore){
    currentPlayer.topScore = currentpopCount
    savePlayers()
  }

  currentpopCount = 0
StopClock()
draw()
drawScoreboard()

  }

//#endregion

let players = []
loadPlayers()

function setPlayer(event){
  event.preventDefault()
  let form = event.target

  let playerName = form.playerName.value

   currentPlayer = players.find(player => player.name == playerName)

  if(!currentPlayer){
  currentPlayer = {name:playerName, topScore: 0}
  players.push(currentPlayer)
  savePlayers()
  }
  
  form.reset()
document.getElementById("game").classList.remove("hidden")
form.classList.add("hidden")
  draw()
  drawScoreboard()
}

function changePlayer(){
document.getElementById("playerForm").classList.remove("hidden")
document.getElementById("game").classList.add("hidden")
}

function savePlayers(){
  window.localStorage.setItem("players", JSON.stringify(players))
}
function loadPlayers(){
  let playersData = JSON.parse(window.localStorage.getItem("players"))
  if(playersData){
      players = playersData
    
  }
}

function drawScoreboard(){
let template = ""

players.sort((p1,p2) => p2.topScore -p1.topScore)
players.forEach(player => {template += `
<div class="d-flex space-between">
  <span>
    <i class="fa fa-user-circle" aria-hidden="true"></i>
      ${player.name}
  </span>
  <span>Score:${player.topScore} </span>
      </div>
`})

document.getElementById("players").innerHTML = template

}

drawScoreboard()