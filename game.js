
var gamePattern = [];
const buttonColors = ["red","blue", "green", "yellow"];

var userChosenPattern = [];

var started = false;
var level = 0;

$(document).keypress(
  function (){
    if(!started)
    {
      nextSequence();
      started = true;
    }
  }
)

function animatePress(pressed)
{
  $("#"+pressed).addClass("pressed");
  setTimeout(
    function(){
      $("#"+pressed).removeClass("pressed");
    },100)
}

function playSound(name)
{
  var audio = new Audio('sounds/'+name+'.mp3');
  audio.play();
}
function nextSequence()
{
  userChosenPattern = []

  level++;
  $("#level-title").text("level "+level);

  var ranNum = Math.random()*4;
  ranNum = Math.floor(ranNum);
  var randomChosenColor = buttonColors[ranNum];
  gamePattern.push(randomChosenColor);
  $("#"+randomChosenColor).fadeOut("fast").fadeIn("fast");

  playSound(randomChosenColor);
}

$(".btn").click(
  function(){
    var userChosenColor = $(this).attr("id");
    userChosenPattern.push(userChosenColor);
    animatePress(userChosenColor);

    playSound(userChosenColor);
    checkAnswer(userChosenPattern.length-1);
  }
)

function checkAnswer(currentLevel)
{
  if(gamePattern[currentLevel] === userChosenPattern[currentLevel])
  {

  if(gamePattern.length === userChosenPattern.length)
  {
    setTimeout(
      function(){
        nextSequence();
      },1000
    )
  }
}
  else{
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(
      () => {$("body").removeClass("game-over");},200
    )
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver(){
  level = 0;
  started = false;
  gamePattern = [];
}
