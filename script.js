(function() {
    //Game data (pairs of emojis)
    const cardsArray = ["🍎", "🍌", "🍇", "🍒", "🍎", "🍌", "🍇", "🍒"];
    //shuffle cards
    cardsArray.sort(()=> 0.5 - Math.random());

    const gameBoard = document.getElementById('game-board');
    let firstCard = null;
    let secondCard = null;
    let lockBoard = false;


    //create card elements
    cardsArray.forEach(symbol =>{
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.symbol = symbol;
        card.innerText = "?";
        card.addEventListener('click',flipCard);
        gameBoard.appendChild(card);
    });

    //flip card function
    function flipCard(){
        if(lockBoard || this === firstCard) return;

        this.classList.add('flipped');
        this.innerText = this.dataset.symbol;

        if(!firstCard){
            firstCard = this;
            return;
        }

        secondCard = this;
        checkMatch();
    }

    //check for match
    function checkMatch(){
        lockBoard = true;

        if(firstCard.dataset.symbol === secondCard.dataset.symbol){
            resetTurn();
        }else{
            setTimeout(()=>{
                firstCard.classList.remove('flipped');
                secondCard.classList.remove('flipped');
                firstCard.innerText = "?";
                secondCard.innerText = "?";
                resetTurn();
            },1000);
        }
    }

    function resetTurn(){
        [firstCard,secondCard]=[null,null];
        lockBoard = false;
    }
})();