const mongoose = require('mongoose');
require('dotenv').config();
const DbConnect = async()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGOOSEURL);
        console.log(`Mongodb connected @ http://${conn.connection.host+conn.connection.port}`);
    }catch(error){
        console.log(error);
    }
}

module.exports = DbConnect ;