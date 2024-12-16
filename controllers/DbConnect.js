const mongoose = require('mongoose');

const DbConnect = async()=>{
    try{
        const conn = await mongoose.connect('mongodb://localhost:27017');
        console.log(`Mongodb connected @ http://${conn.connection.host+conn.connection.port}`);
    }catch(error){
        console.log(error);
    }
}

module.exports = DbConnect ;