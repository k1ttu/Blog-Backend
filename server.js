const express = require('express');
const port = 3000;
const app = express();

const Blogs = require('./models/Blogs');
const DbConnect = require('./controllers/DbConnect');

app.use(express.json());
DbConnect();

app.get('/',(req , res)=>{
    console.log("Server Initiated");
    res.send("Welcome page!");
});

app.get('/blogs', async ( req , res )=>{
    try{
        const data = await Blogs.find();
        res.send(data);
        console.log(data);
    }
    catch(error){
        console.log(error.message);
    }
});

app.post('/blog/AddNewBlog' , async ( req , res ) => {
    try{
        const {date , title , headings , content , coverPic , images } = req.body ;
        const newPost = new Blogs({date , title , headings , content , coverPic , images });
        const savedUser = await newPost.save();

        res.status(201).json(savedUser);
    }
    catch(error){
        res.send(
            {
                message:error.message,
                error:error
            }
        )
    }
});

app.listen(port , ()=>{
    console.log(`Server running at http://127.0.0.1:${port}`);
});