var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var isStarted = false;


// $(document).keypress(function() {
//     if (!started) {
//       $("#level-title").text("Level " + level);
//       nextSequence();
//       started = true;
//     }
//   });




    $(document).keypress(function () {

        if (!isStarted) 
        {
          $("h1").text("Level " + level);
            nextSequence();
        isStarted = true;
        }
      });
      
      $(".btn").click(function () {
        var userChosenColor = $(this).attr("id");
       
      
        userClickedPattern.push(userChosenColor);
        checkAnswer( userClickedPattern.length-1);
      
        //console.log(lastIndex);
      
      
      
        playSound(userChosenColor);
        animatePress(userChosenColor);
       
        console.log(userClickedPattern);
      });



function nextSequence() {
    userClickedPattern = [];
  level++;
  $('h1').text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);
  //console.log(gamePattern);

  //console.log(randomChosenColor);

  $("#" + randomChosenColor)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColor);
}

function playSound(name) {
  var randomAudioMaker = new Audio("sounds/" + name + ".mp3");
  randomAudioMaker.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {


    if(gamePattern[currentLevel] === userClickedPattern[currentLevel])
    {
        console.log("success")

        if(userClickedPattern.length === gamePattern.length)
        {
        setTimeout(function () {
            nextSequence()
        }, 1000);
       
        }
    }
    else
    {
        var wrongSound = new Audio("sounds/wrong.mp3")
        wrongSound.play();
        $('body').addClass('game-over')
        setTimeout(function () {
            $('body').removeClass('game-over')
        },200)
        $('h1').text("Game over. Press any key to restart")
            startOver();
    }
}

function startOver()
{
    level = 0;
    gamePattern = [];
    isStarted = false;
}


