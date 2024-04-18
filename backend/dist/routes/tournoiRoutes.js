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
const express_1 = require("express");
const Tournoi_1 = __importDefault(require("../models/Tournoi"));
const router = (0, express_1.Router)();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tournois = yield Tournoi_1.default.find().populate('equipesParticipantes matchs');
    if (!tournois.length) {
        return res.status(404).json({ message: 'No tournaments found' });
    }
    res.status(200).json(tournois);
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nomDuTournoi, reglement, equipesParticipantes, matchs } = req.body;
        const tournoi = new Tournoi_1.default({ nomDuTournoi, reglement, equipesParticipantes, matchs });
        yield tournoi.save();
        res.status(201).json(tournoi);
    }
    catch (error) {
        res.status(400).json({ message: 'Error creating tournament', error: error.message });
    }
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tournoi = yield Tournoi_1.default.findById(req.params.id).populate('equipesParticipantes matchs');
    if (!tournoi) {
        return res.status(404).json({ message: 'Tournament not found' });
    }
    res.status(200).json(tournoi);
}));
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nomDuTournoi, reglement, equipesParticipantes, matchs } = req.body;
        const tournoi = yield Tournoi_1.default.findByIdAndUpdate(req.params.id, { nomDuTournoi, reglement, equipesParticipantes, matchs }, { new: true }).populate('equipesParticipantes matchs');
        if (!tournoi) {
            return res.status(404).json({ message: 'Tournament not found' });
        }
        res.status(200).json(tournoi);
    }
    catch (error) {
        res.status(400).json({ message: 'Error updating tournament', error: error.message });
    }
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deleted = yield Tournoi_1.default.findByIdAndDelete(req.params.id);
    if (!deleted) {
        return res.status(404).json({ message: 'Tournament not found' });
    }
    res.status(204).send();
}));
exports.default = router;
