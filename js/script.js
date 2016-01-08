$(document).ready(function() {

  $('#start').hover(
    function() {
      $("#timer").addClass('hover')
    },
    function() {
      $("#timer").removeClass('hover')
    }
  )

  //initial variables
  breakLength = 5;
  sessionLength = 25;
  session = sessionLength * 60;
  var clicked = false;
  var running = false;
  var interv1;
  var interv2;

  //plus-minus button clicks
  $("#breakMinus").click(function() {
    if (clicked == false) {
      if (breakLength > 0) {
        breakLength -= 1;
        $("#breakLength").text(breakLength);
      }
    }
  })

  $("#breakPlus").click(function() {
    if (clicked == false) {
      if (breakLength < 1000) {
        breakLength += 1;
        $("#breakLength").text(breakLength);
      }
    }
  })

  $("#sessionMinus").click(function() {
    if (clicked == false) {
      if (sessionLength > 1) {
        sessionLength -= 1;
        $("#sessionLength").text(sessionLength);
        $("#session").text(sessionLength);
      }
    }
  })

  $("#sessionPlus").click(function() {
    if (clicked == false) {
      if (sessionLength < 1000) {
        sessionLength += 1;
        $("#sessionLength").text(sessionLength);
        $("#session").text(sessionLength);
      }
    }
  })

  //session click to start
  $("#start").on('click', function() {
    if (clicked == false) {
      display = $('#session');
      clicked = true;
      startTimer(sessionLength * 60, display);
      $("#timer").addClass("green-text");
    } else {
      $("#timer").removeClass("green-text");
      clearInterval(interv1);
      clearInterval(interv2);
      clicked = false;
    }

  });

  //reset button click
  $("#reset").click(function() {
    clearInterval(interv1);
    clearInterval(interv2);
    $("#session").html(sessionLength);
    $("#timer").removeClass("orange-text green-text").html("Session");
    clicked = false;
  });

  //display//
  $("#sessionLength").text(sessionLength);
  $("#breakLength").text(breakLength);
  $("#session").text(sessionLength);

  console.log(sessionLength);
  console.log(secondS);

  //session timer function  
  function startTimer(duration, display) {

    var timer = duration,
      minutes, seconds;
     interv1 = setInterval(function() {
      minutes = parseInt(timer / 60, 10)
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.text(minutes + ":" + seconds);

      if (--timer < 0) {
        timer = duration;
        clearInterval(interv1);
        $("#session").html("Finished!");
        breakTimer(breakLength * 60, display);
        if (breakLength > 0) {
          $('#timer').removeClass("green-text").addClass("orange-text").html("Break");
        }

      }

    }, 1000)
  };

  //break timer function
  function breakTimer(duration, display) {

    var timer = duration,
      minutes, seconds;
    interv2 = setInterval(function() {
      minutes = parseInt(timer / 60, 10)
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.text(minutes + ":" + seconds);

      if (--timer < 0) {
        timer = duration;
        clearInterval(interv2);
        $("#session").html("Ready?");
        $("#timer").removeClass("orange-text").addClass("green-text").html("Session");
        startTimer(sessionLength * 60, display);

      }

    }, 1000)
  };

});