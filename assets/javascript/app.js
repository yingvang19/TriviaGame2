$(document).ready(function () {
  var options = [
    {
      question: "What is Hulk's favorite catchphrase?", 
      choice: ["Hulk Crash", "Hulk Smash", "Hulk Punch", "Hulk Stomp"],
      answer: 1,
      photo: "assets/images/hulk.jpg"
     },
     {
       question: "What is Peter Quill's nickname?", 
      choice: ["Star Lord", "Star Quill", "Star Man", "Star Blaster"],
      answer: 0,
      photo: "assets/images/star-lord.jpg"
     }, 
     {
       question: "Which Marvel Charater can use the quantum realm to go back in time?", 
      choice: ["Doctor Strange", "Scott Lang", "Loki", "Spiderman"],
      answer: 1,
      photo: "assets/images/ant-man.jpg"
    }, 
    {
      question: "What is Captain America's name?", 
      choice: ["Steve Robbins", "Steve Roberts", "Steve Rogers", "Steve Rovers"],
      answer: 2,
      photo: "assets/images/captain-america.jpg"
    }, 
    {
      question: "What Marvel charater owns the Mjolnir weapon?", 
      choice: ["Captain America", "Drake", "Groot", "Thor"],
      answer: 3,
      photo: "assets/images/thor.jpg"
    }, 
    {
      question: "How many infinity stones are there in the Marvel Universe?", 
      choice: ["6", "4", "5", "7"],
      answer: 0,
      photo: "assets/images/infinity-stones.jpg"
    }, 
    {
      question: "Which female Marvel charater can shoot plasma out of their hands?", 
      choice: ["Iron Man", "Carol Danvers", "Scarlet Witch", "Black Widow"],
      answer: 1,
      photo: "assets/images/captain-marvel.jpg"	
    }];
  
  var correctCount = 0;
  var wrongCount = 0;
  var unanswerCount = 0;
  var timer = 20;
  var intervalId;
  var userGuess ="";
  var running = false;
  var qCount = options.length;
  var pick;
  var index;
  var newArray = [];
  var holder = [];
  
  //click start button to start game
  $("#start").on("click", function () {
      $("#start").hide();
      runTimer();
      displayQuestion();
      
      for(var i = 0; i < options.length; i++) {
    holder.push(options[i]);
  }
    })
  //timer start
  function runTimer(){
    if (!running) {
    intervalId = setInterval(decrement, 1000); 
    running = true;
    }
  }
  //timer countdown
  function decrement() {
    $("#time-left").html("<h3>Time remaining: " + timer + "</h3>");
    timer --;
  
    //stop timer if reach 0
    if (timer === 0) {
      unanswerCount++;
      stop();
      $("#answer-block").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
      hidepicture();
    }	
  }
  
  //timer stop
  function stop() {
    running = false;
    clearInterval(intervalId);
  }
  
  function displayQuestion() {
    //generate random index in array
    index = Math.floor(Math.random()*options.length);
    pick = options[index];
  
      //iterate through answer array and display
    $("#question-block").html("<h2>" + pick.question + "</h2>");
    for(var i = 0; i < pick.choice.length; i++) {
  
      var userChoice = $("<div>");
      userChoice.addClass("answerchoice");
      userChoice.html(pick.choice[i]);
      //assign array position to it so can check answer
      userChoice.attr("data-guessvalue", i);
      $("#answer-block").append(userChoice);
    }
  
  //click function to select answer and outcomes
  $(".answerchoice").on("click", function () {
    //grab array position from userGuess
    userGuess = parseInt($(this).attr("data-guessvalue"));
  
    //correct guess or wrong guess outcomes
    if (userGuess === pick.answer) {
      stop();
      correctCount++;
      userGuess="";
      $("#answer-block").html("<p>Correct!</p>");
      hidepicture();
  
    } else {
      stop();
      wrongCount++;
      userGuess="";
      $("#answer-block").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
      hidepicture();
    }
  })
  }
  
  
  function hidepicture () {
    $("#answer-block").append("<img src=" + pick.photo + ">");
    $("<img>");
    newArray.push(pick);
    options.splice(index,1);
  
    var hidpic = setTimeout(function() {
      $("#answer-block").empty();
      timer= 20;
  
    //run the score screen if all questions answered
    if ((wrongCount + correctCount + unanswerCount) === qCount) {
      $("#question-block").empty();
      $("#question-block").html("<h3> It's Over!  End Game Results: </h3>");
      $("#answer-block").append("<h3> Correct: " + correctCount + "</h3>" );
      $("#answer-block").append("<h3> Incorrect: " + wrongCount + "</h3>" );
      $("#answer-block").append("<h3> Unanswered: " + unanswerCount + "</h3>" );
      $("#start").append('<button>Play Again?</button>').show(); 
      correctCount = 0;
      wrongCount = 0;
      unanswerCount = 0;
  
    } else {
      runTimer();
      displayQuestion();
  
    }
    }, 3500);
  }
  //start the game again
  $("#start").on("click", function() {
    $("#start").empty();
    $("#answer-block").empty();
    $("#question-block").empty();
    for(var i = 0; i < holder.length; i++) {
      options.push(holder[i]);
    }
    runTimer();
    displayQuestion();
  
  })
  
  })