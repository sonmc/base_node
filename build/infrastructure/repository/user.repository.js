"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
require("reflect-metadata");
const typedi_1 = require("typedi");
const base_repositoy_1 = require("./base.repositoy");
const user_schema_1 = require("infrastructure/schemas/user.schema");
const typeorm_1 = require("typeorm");
let UserRepository = class UserRepository extends base_repositoy_1.BaseRepository {
    constructor() {
        const entityManager = (0, typeorm_1.getManager)().getRepository(user_schema_1.User);
        super(entityManager);
    }
};
UserRepository = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [])
], UserRepository);
exports.UserRepository = UserRepository;
