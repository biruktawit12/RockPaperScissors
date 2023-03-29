const http=require('http')
const express=require('express')
const path=require('path')
const socket=require('socket.io')
const Game=require('./Game');
// const { DiffieHellmanGroup } = require('crypto');

const app=express();

const server=http.createServer(app)

const clientPath=`${__dirname}/../Client`;

app.use(express.static(clientPath))


const io=socket(server)

let waitingPlayer=null;

io.on('connection',(sock)=>{
    if(waitingPlayer){
        new Game(waitingPlayer,sock)
        waitingPlayer=null;
    }else{
        waitingPlayer=sock;
        waitingPlayer.emit('chat','waiting for an opponent')
    }

});
server.listen(3000,()=>{
    console.log('connected to the server')
})