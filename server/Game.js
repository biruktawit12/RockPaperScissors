class Game {
  countscore=[0,0]
        constructor(p1,p2){
            this._player=[p1,p2];
            this._choice=[null,null]
           this._sendToPlayers("Game started : Choose one of the options")
      
           this._player.forEach((player,idx)=>{
                
                player.on("turn", (turn)=>{
                    this._OnTurn(idx,turn)
                    
                } )
           })
            console.log(this.countscore)

          }   
         
        _OnTurn(playeridx, turn){
    
          this._choice[playeridx]=turn;
      //checks if both players take turn.   
          if(this._choice[0]&&this._choice[1]){
            //if both player made a choice then 
            this._player[0].emit('turn',this._choice[1])
            this._player[1].emit('turn',this._choice[0])
         //check to see who won the game

           this._whowins(this._choice[0],this._choice[1])
          }
         
   }
        _sendToPlayers(msg) {
            this._player.forEach((player) => {
              player.emit('chat', msg);
            });
          }
        
          _sendToPlayer(msg,player,score) {
              player.emit('chat', msg);
          }


        
      _whowins(player1choice,player2choice){
  if(player1choice==player2choice){
    this._keepscore(0,0)
      this._sendToPlayers('it is a draw')
  }else if((player1choice=="rock" && player2choice=="scissors")||
  (player1choice=="scissors" && player2choice=="paper")||
  (player1choice=="paper" && player2choice=="rock")) {
    this._keepscore(1,-1)
    this._sendToPlayer("you won",  this._player[0])
    this._sendToPlayer("you lost",  this._player[1])
  }else{
this._keepscore(-1,1)
    this._sendToPlayer("you lost",  this._player[0])
    this._sendToPlayer("you won",  this._player[1])
  }

  this._choice=[null,null]  
  
  }

  _keepscore(p1score,p2score){
    this.countscore[0]=this.countscore[0]+p1score
    this.countscore[1]=this.countscore[1]-p2score
    // this._sendToPlayer(`${this.countscore[0]} vs ${this.countscore[1]} `)
  }


}


module.exports= Game