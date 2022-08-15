var play = document.getElementById('play');
var reset = document.getElementById('reset');
var showScore = document.getElementById('score');
let score = parseInt(showScore.textContent);
let imgPos = [];
var images = document.querySelectorAll('.image');
let cardClickedCounter = 0;
let cardClickedLog = [];
var win =document.getElementById('win');
var press = document.getElementById('press');
play.addEventListener('click', startGame);
reset.addEventListener('click', resetGame);
function startGame(){
    press.style.visibility = 'hidden';
    generate();
    play.disabled = true;
    reset.disabled = false;
}

function generate(){
    
    var cards = [1, 2, 3, 4, 5, 6, 7, 8];
    

    for (let i = 0; i < 8; i++) {
        
        var randomNumber = Math.floor(Math.random() * cards.length);
        var image = cards[randomNumber];
        imgPos.push([`image/bing${image}.jpg`, true]);
        imgPos.push([`image/bing${image}.jpg`, true]);
        cards.splice(randomNumber, 1);
      }



      //Fisher-Yates algorithm
      var shuffleArray = function(array) {
        var counter = array.length;
    
        while (counter > 0) {
            var ind = Math.floor(Math.random() * counter);
            counter--;
            var temp = array[counter];
            array[counter] = array[ind];
            array[ind] = temp;
        }
    };

        shuffleArray(imgPos);
}

    // Card-click listeners

    for (let i = 0; i < images.length; i++) {
        
        images[i].addEventListener('click', function () {
    
        showCard(i);
        
         });
    }
  
function showCard(i){
    if (imgPos[i][1] === true) {
    images[i].setAttribute('src', imgPos[i][0]);
    cardClickedLog.push(i);
    imgPos[i][1] = false;
    cardClickedCounter++;
    console.log(imgPos);
      
    
   // show only 2 cards
    if (cardClickedCounter % 2 === 0){
      evaluateMatch(cardClickedLog);
    
    } else if (cardClickedCounter % 3 === 0){ 
        
       images[cardClickedLog[0]].setAttribute("src", "image/card.jpg");
       images[cardClickedLog[1]].setAttribute("src", "image/card.jpg"); 
       imgPos[cardClickedLog[0]][1] = true;
       imgPos[cardClickedLog[1]][1] = true;
        cardClickedCounter = 1;
        cardClickedLog.splice(0, 2);
      
       
      
    }
    }
    
}


function evaluateMatch(i){
  if (cardClickedCounter === 2){
     
    if ( images[cardClickedLog[0]].src === images[cardClickedLog[1]].src
    ){
        console.log('Match!');
      setTimeout(function(){images[cardClickedLog[0]].classList.add('card_hide')}, 600) ;
      setTimeout(function(){images[cardClickedLog[1]].classList.add('card_hide')}, 600) ;
        score++;
        showScore.innerHTML = score; 
        if (score === (images.length)/2){
            win.style.visibility = 'visible';
        } 

    
    }
    else{console.log('oops!');
    
     }
}

}

function resetGame(){
    for (var i=0; i < images.length; i++) {
        images[i].setAttribute("src", "image/card.jpg");
        generate();
        images[i].classList.remove("card_hide");
        score = 0;
        showScore.innerHTML = score;
        win.style.visibility = 'hidden';
    }
}
