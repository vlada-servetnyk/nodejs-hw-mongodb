import mongoose from "mongoose";
import { getEnvVar } from "../utils/getEnvVar.js";

export const initMongoConnection = async () => {
    try {
        const USER = getEnvVar('MONGODB_USER');
        const PASSWORD = getEnvVar('MONGODB_PASSWORD');
        const URL = getEnvVar('MONGODB_URL');
        const DB = getEnvVar('MONGODB_DB');
        
        await mongoose.connect(`mongodb+srv://${USER}:${PASSWORD}@${URL}/${DB}?retryWrites=true&w=majority&appName=Cluster0`);
        console.log("Mongo connection successfully established!");
        
    } catch (error) {
        console.log(error.message);
        throw error;
    }
};

