import mongoose from "mongoose";

const connectDB = async() => {
    try{
        const connectionInstance = await mongoose.connect (`${process.env.MONGODB_URI}`)
        console.log(`Connection successfull ${connectionInstance.connection.host}`);
        
    }catch(e){
        console.log('Connection unsuccessfull');
        console.log(e);
        
        
    }
}

export default connectDB;