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
const equipeRoutes_1 = __importDefault(require("./routes/equipeRoutes"));
const joueurRoutes_1 = __importDefault(require("./routes/joueurRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const app = (0, express_1.default)();
const port = 4000;
// Middleware pour le parsing de JSON doit venir avant les routes
app.use(express_1.default.json());
// Définition des routes
app.use('/api/users', userRoutes_1.default);
app.use('/api/joueurs', joueurRoutes_1.default);
app.use('/api/equipes', equipeRoutes_1.default);
// URI de connexion à MongoDB
const uri = "mongodb+srv://fatma:Vh7Lig6lgIaIRU91@cluster0.1sydj3x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(uri);
            console.log("Base de données connectée avec succès !");
        }
        catch (e) {
            console.error("Erreur de connexion à la base de données:", e);
        }
    });
}
run().catch(console.dir);
// Middleware pour gérer les erreurs
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Quelque chose s\'est mal passé!');
});
// Démarrage du serveur
app.listen(port, () => {
    console.log(`Le serveur fonctionne sur le port ${port}`);
});
