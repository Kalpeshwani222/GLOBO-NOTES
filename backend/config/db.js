const mongoose = require('mongoose');

const connectDB = async () =>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology:true,
            useNewUrlParser:true,
            
        });
        console.log(`mongodb  connected ${conn.connection.host} `)
    } catch (error) {
        console.error(`Error : ${error.message}`);
        process.exit();
    }
};
module.exports = connectDB;

// mongoose.connect("mongodb://localhost:27017/notepad",{
//     useUnifiedTopology:true,
//      useNewUrlParser:true,
    
// }).then(()=> console.log("Connection successful"))
// .catch((e) =>console.log(e));
