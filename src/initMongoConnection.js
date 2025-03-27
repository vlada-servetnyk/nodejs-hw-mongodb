import mongoose from "mongoose";

export const initMongoConnection = async () => {
    try {
        const USER = process.env.MONGODB_USER;
        const PASSWORD = process.env.MONGODB_PASSWORD;
        const URL = process.env.MONGODB_URL;
        const DB = process.env.MONGODB_DB;
        
        await mongoose.connect(`mongodb+srv://${USER}:${PASSWORD}@${URL}/${DB}?retryWrites=true&w=majority&appName=Cluster0`);
        console.log("Mongo connection successfully established!");
        
    } catch (error) {
        console.log(error.message);
        throw error;
    }
};

