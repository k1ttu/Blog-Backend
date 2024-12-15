const express = require('express');
const port = 3000;
const app = express();
const fs = require('fs');
const path = require('path');

const BlogsDir = path.join(__dirname , '/Blogs');

app.get('/',(req , res)=>{
    console.log("Server Initiated");
    res.send("Welcome page!");
})

app.get('/blogs',(req , res)=>{
    fs.readdir(BlogsDir , ( e , files )=>{
        if(e){
            console.log("Error reading folder" + e);
            return res.status(500).send("Error reading folder");
        }
        const txtFiles = files.filter(file => path.extname(file) == '.txt').map(file=>(
            {
                id:file
            }
        ));
        res.json(txtFiles);
    })
})

app.get('/blogs/:BlogID' , ( req , res ) =>{
    const id = req.params.BlogID;
    const filePath = path.join( BlogsDir , id  );

    fs.access(filePath ,fs.constants.F_OK, (error)=>{
        if( error){
            console.log('File not found');
            return res.status(404).send("Not Found");
        }
        fs.readFile(filePath , 'utf-8' , (error , data)=>{
            if(error){
                console.log('Error reading file:' , error);
                return res.status(500).send(error);
            }
            const blogData = data;
            res.json({content:blogData , id:id});
        })
    })
})

app.listen(port , ()=>{
    console.log(`Server running at http://127.0.0.1:${port}`);
})