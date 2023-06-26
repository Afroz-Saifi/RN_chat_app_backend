const express=require('express');
const cors=require("cors");
const { connection } = require('./config/db');
const { userRoute } = require('./routes/user.route');
const { Chat } = require('./models/chat.model');
const { authentication } = require('./middleware/user.authentication');
const app=express();
app.use(express.json());

app.use(cors())
require("dotenv").config();


const http = require("http").createServer(app);
const io = require("socket.io")(http);

// ========================================Routes

app.get('/',(req,res) => {
    res.send("Welcome to the home route")
})

app.use("/user",userRoute)
app.post("/chats", authentication, async (req, res) => {
    try {
        const data = await Chat.find()
        res.json(data)
    } catch (error) {
        res.json({error: error.message})
    }
})
// app.post("/msg", async (re, res) => {
//     try {
//         const data = new Chat({
//             sender: "afroz",
//             message: "hii"
//         })
//         await data.save()
//         res.send("ho gya")
//     } catch (error) {
//         res.send(error.message)
//     }
// })



io.on('connection', (socket) => {
    console.log('A user connected');
  
    // Handle incoming messages
    socket.on('sendMessage', async (data) => {
      // Save the message to the database
      const message = new Chat({
        sender: data.sender,
        message: data.message,
        recipient: data.recipient
      });
      await message.save();
  
      // Emit the message to all connected clients in the same room
      io.emit('newMessage', data);
    });
  
    // Handle disconnections
    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });

// ==========================listening the server
http.listen(process.env.PORT,async()=>{
    try {
        await connection
        console.log("connected to db")
    } catch (error) {
        console.log(error.message)
    }
    console.log(`server running on port ${process.env.PORT}`)
})