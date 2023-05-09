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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
class BaseRepository {
    constructor(repo) {
        this.repo = repo;
    }
    getListItem() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repo.find();
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repo.findOneOrFail(id);
        });
    }
    create(data, entityAlreadyCreated) {
        return __awaiter(this, void 0, void 0, function* () {
            const entity = entityAlreadyCreated || this.getInstance(data);
            return yield this.repo.save(entity);
        });
    }
    update(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.repo.update(id, body);
            return this.getById(id);
        });
    }
    del(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const entity = yield this.getById(id);
            yield this.repo.delete(id);
            return entity;
        });
    }
    getInstance(data) {
        return this.repo.create(data);
    }
}
exports.BaseRepository = BaseRepository;
