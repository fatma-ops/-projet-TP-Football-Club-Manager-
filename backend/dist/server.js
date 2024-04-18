"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
const equipeRoutes_1 = __importDefault(require("../src/routes/equipeRoutes"));
const joueurRoutes_1 = __importDefault(require("../src/routes/joueurRoutes"));
const userRoutes_1 = __importDefault(require("../src/routes/userRoutes"));
const app = (0, express_1.default)();
const Port = 4000;
app.use('/api/user', userRoutes_1.default);
app.use('/api/joueur', joueurRoutes_1.default);
app.use('/api/user', equipeRoutes_1.default);
const uri = "mongodb+srv://fatma:Vh7Lig6lgIaIRU91@cluster0.1sydj3x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
            yield mongoose_1.default.connect(uri);
            yield mongoose_1.default.connection.db.admin().command({ ping: 1 });
            console.log("Base de données connectée avec succès !");
        }
        catch (e) {
            console.error(e);
        }
    });
}
run().catch(console.dir);
app.use(express_1.default.json());
app.listen(Port, () => {
    console.log(`serveur running on port ${Port}`);
});
