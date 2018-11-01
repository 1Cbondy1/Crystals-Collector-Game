 //declare all of my global variables
 var wins = 0;
 var losses = 0;
 var targetNumber;
 var counter = 0;
 var crystalValue = 0;
 var toggle = false;

 var numberOptions = [10, 4, 7, 2];
 var images = ["assets/images/Crystal-01.png", "assets/images/Crystal-02.png", "assets/images/Crystal-03.png", "assets/images/Crystal-04.png"];

 //relay number to guess to the DOM
 $("#number-to-guess").text(targetNumber);

 //defining the startGame function, which clears the score and counter, and randomly selects the target number and points per crystal
 function startGame() {

     //clearing game values
     $("#score").html("Your score: 0");
     counter = 0;
     crystalValue = 0;
     numberOptions = [];

     //randomly selection our target number from 19-120
     targetNumber = Math.floor(Math.random() * 102) + 19;

     //relaying that target in the DOM
     $("#number-to-guess").text(targetNumber);

     //generating random point values for each of crytals
     for (var i = 0; i < images.length; i++) {
         numberOptions[i] = Math.floor(Math.random() * 12) + 1;

         // relay the attribute associated with each crystal image
         $("#crystal"+i).attr("data-crystalvalue", numberOptions[i])
     }
 }   

 //cycle through crystal images and relay them to the DOM
 for (var j = 0; j < 4; j++) {

    //create and img tag in the DOM to place the images into
    var imageCrystal = $("<img>");

    //add crystal-image class in order to manipulate our images in CSS
    imageCrystal.addClass("crystal-image");

    //give each crystal a source image file from our image array
    imageCrystal.attr("src", images[j]);

    //create new id for each crystal
    imageCrystal.attr("id","crystal"+j);

    // relay the attribute associated with each crystal image
    imageCrystal.attr("data-crystalvalue", numberOptions[j]);

    //append it to the end of our crystals ID in the DOM
    $("#crystals").append(imageCrystal);
 }

 //call the startGame function to start the game

 startGame();

 //function detecting when the user clicks on something with the crystal-image class

 $(".crystal-image").on("click", function() {

     //create a variable to get the value of the clicked crystal image
     crystalValue = ($(this).attr("data-crystalvalue"));

     //parse it to get an integer value
     crystalValue = parseInt(crystalValue);

     //add the corresponding points to the score and update the score on-screen
     counter += crystalValue;
     $("#score").html("Your score: " + counter);

     //if the user matches the target number, the wins are updated and the game restarts
     if (counter === targetNumber) {
         wins++;
         $("#wins").text("Wins: " + wins);
         startGame();
     }

     //if the user goes over the target number, the losses are updated and the game restarts
     else if (counter >= targetNumber) {
         losses++;
         $("#losses").text("Losses: " + losses);
         startGame();
     }
 });