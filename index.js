const io=require('socket.io')(8000);
const users={};
io.on('connection',socket=>{
    socket.on('new-user-joined', username=>{
        users[socket.id]=username;
        console.log("New user",username);
        socket.broadcast.emit('user-joined',username);
    });
    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message:message, name:users[socket.id]})
    }) 
    socket.on('disconnect',message=>{
        socket.broadcast.emit('leave',users[socket.id])
        
    }) 
})