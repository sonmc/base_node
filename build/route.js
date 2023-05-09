"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const login_ctrl_1 = __importDefault(require("use-case/auth/login/login.ctrl"));
const role_ctrl_1 = __importDefault(require("use-case/role/role.ctrl"));
const user_ctrl_1 = require("use-case/user/user.ctrl");
const routes = [
    { path: '/', ctrl: user_ctrl_1.getAll },
    { path: '/auth/login', ctrl: login_ctrl_1.default },
    { path: '/roles', ctrl: role_ctrl_1.default },
];
exports.default = routes;
