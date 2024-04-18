
import mongoose from 'mongoose';
import express, {Express} from "express";

const app :Express = express()
const Port = 4000;

const uri = "mongodb+srv://fatma:Vh7Lig6lgIaIRU91@cluster0.1sydj3x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

async function run() {
    try {
        // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
        await mongoose.connect(uri);
        await mongoose.connection.db.admin().command({ ping: 1 });
        console.log("Base de données connectée avec succès !");
    } catch (e) {
        console.error(e);
    }
}
run().catch(console.dir);

app.use(express.json()) ;

app.listen( Port , () => {
    console.log(`serveur running on port ${Port}`)
}) 
