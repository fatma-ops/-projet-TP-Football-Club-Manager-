import express , {Express} from 'express'

const app :Express = express()
const Port = 4000;

app.use(express.json()) ; 

app.listen();

app.listen( Port , () => {
    console.log(`serveur running on port ${Port}`)


}) 