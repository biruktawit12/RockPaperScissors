

    // const chatform=document.querySelector('#chat-form');
    const rock=document.getElementById('rock')
    const paper=document.getElementById('paper');
    const scissors=document.getElementById('scissors');
    const lefthand=document.getElementById("left")
    const righthand=document.getElementById("right")
    const playAgainButton=document.getElementById('play-again')
    const sock=io();

    sock.on('chat',(text)=>{
      writeEvent(text)
    })
  

   
        const writeEvent=(text)=>{
            document.getElementById('result').innerHTML=text
                
        
    }


    // chatform.addEventListener('submit',onFormSubmitted)
 
    const showChoice=(text)=>{
        lefthand.setAttribute('src',`../${text}-left.png`); 
        lefthand.classList.remove('lefthand')
          
       
    }
    sock.on('turn',(text)=>{
        show(text)
        setTimeout(reset, 2000)
    })
    const show=(text)=>{
        righthand.setAttribute('src',`../${text}-right.png`)
        righthand.classList.remove('righthand')
        righthand.classList.add('righthandskewY')
        playAgainButton.style.display="block";

    }

        rock.addEventListener('click',passmychoice);
    
        paper.addEventListener('click',passmychoice);
    
        scissors.addEventListener('click',passmychoice);
        
    function passmychoice(){

    sock.emit('turn',this.id)
        showChoice(this.id)
    }



    

    function reset(){
        showChoice('rock')
        show('rock')
        // righthand.classList.remove('righthandskewY')
        // righthand.classList.add('righhandskewX')
        lefthand.classList.add('lefthand')
        righthand.classList.add('righthand')
        
       
    }

playAgainButton.addEventListener('click',reset);



    




