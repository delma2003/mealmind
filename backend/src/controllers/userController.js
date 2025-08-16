"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = void 0;
const getUsers = async (req, res) => {
    res.json([{ name: 'Test User', email: 'test@example.com' }]);
};
exports.getUsers = getUsers;
