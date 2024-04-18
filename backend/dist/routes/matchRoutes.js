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
const Match_1 = __importDefault(require("../models/Match"));
const router = (0, express_1.Router)();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const matches = yield Match_1.default.find().populate('equipeA equipeB');
    if (!matches.length) {
        return res.status(404).json({ message: 'No matches found' });
    }
    res.status(200).json(matches);
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { equipeA, equipeB, scoreA, scoreB, dateDuMatch } = req.body;
        const match = new Match_1.default({ equipeA, equipeB, scoreA, scoreB, dateDuMatch });
        yield match.save();
        res.status(201).json(match);
    }
    catch (error) {
        res.status(400).json({ message: 'Error creating match', error: error.message });
    }
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const match = yield Match_1.default.findById(req.params.id).populate('equipeA equipeB');
    if (!match) {
        return res.status(404).json({ message: 'Match not found' });
    }
    res.status(200).json(match);
}));
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { equipeA, equipeB, scoreA, scoreB, dateDuMatch } = req.body;
        const match = yield Match_1.default.findByIdAndUpdate(req.params.id, { equipeA, equipeB, scoreA, scoreB, dateDuMatch }, { new: true }).populate('equipeA equipeB');
        if (!match) {
            return res.status(404).json({ message: 'Match not found' });
        }
        res.status(200).json(match);
    }
    catch (error) {
        res.status(400).json({ message: 'Error updating match', error: error.message });
    }
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deleted = yield Match_1.default.findByIdAndDelete(req.params.id);
    if (!deleted) {
        return res.status(404).json({ message: 'Match not found' });
    }
    res.status(204).send();
}));
exports.default = router;
