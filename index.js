const express = require('express');
const port = 3000;
const app = express();
const cors = require('cors');
const Blogs = require('./models/Blogs');
const DbConnect = require('./controllers/DbConnect');

app.use(express.json());
app.use(cors());
app.use(
    cors({
        origin: '*', // Allow only your Angular app
        methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
        allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    })
);

DbConnect();
app.get('/',(req , res)=>{
    console.log("Server Initiated");
    res.send("Welcome page!");
});

app.get('/blogs', async ( req , res )=>{
    try{
        const data = await Blogs.find();
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.send(data);
        console.log(data);
    }
    catch(error){
        console.log(error.message);
    }
});

app.post('/blogs/AddNewBlog' , async ( req , res ) => {
    try{
        const {date , title , headings , content , coverPic , images , preview } = req.body ;
        const newPost = new Blogs({date , title , headings , content , coverPic , images , preview });
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

app.get('/blogs/:id' , async(req , res ) => {
    try{
        const id = req.params.id;
        const post = await Blogs.findById(id);
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.send(post);
    }catch(error){
        res.status(201).send(
            {
                message:error.message,
                error:error
            }
        )
    }
})

app.listen(port , ()=>{
    console.log(`Server running at http://127.0.0.1:${port}`);
});