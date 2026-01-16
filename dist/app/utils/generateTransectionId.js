"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTransectionId = void 0;
const generateTransectionId = () => {
    return `Adv-${Date.now()}-${Math.floor(Math.random() * 0) + 1}`;
};
exports.generateTransectionId = generateTransectionId;
