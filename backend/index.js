const app=require('express')()
const server =require('http').createServer(app)
const cors=require('cors')
const io = require('socket.io')(server,{
    cors:{
        origin:'*',
        methods:['GET','POST']
    }
});

app.use(cors());

const PORT=process.env.PORT || 5000;
app.get('/',(req,res)=>{
    res.send("server is running")
})

io.on('connection',(socket)=>{
    socket.emit('me',socket.id)
    socket.on('disconnect',()=>{
        socket.broadcast.emit("call ended")

    });
    socket.on('calluser',({userToCall,signalData,from,name})=>{
        console.log("preps")
        io.to(userToCall).emit('calluser',{signal:signalData,from,name})
        console.log("preps")

    })
    socket.on('answercall',(data)=>{
        console.log("gigachad")
        io.to(data.to).emit("call accepted",data.signal)
        console.log("gigachad")
    })
})

server.listen(PORT,()=>{
    console.log("we are in bros")
})