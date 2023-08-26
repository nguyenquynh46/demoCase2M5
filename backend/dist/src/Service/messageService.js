"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../data-source");
const message_1 = require("../entity/message");
class MessageService {
    constructor() {
        this.repository = data_source_1.AppDataSource.getRepository(message_1.Message);
        this.add = async (data) => {
            return await this.repository.save(data);
        };
        this.delete = async (id) => {
            return this.repository.delete(id);
        };
        this.getAll = async () => {
            return this.repository.find();
        };
        this.getAllInOrder = async () => {
            return await this.repository.createQueryBuilder("message")
                .leftJoinAndSelect("message.user", "user")
                .leftJoinAndSelect("message.room", "room")
                .getMany();
        };
        this.update = async (id, data) => {
            return await this.repository.update(id, data);
        };
        this.findById = async (id) => {
            return await this.repository.createQueryBuilder("message")
                .leftJoinAndSelect("message.user", "user")
                .leftJoinAndSelect("message.room", "room")
                .where("user.id = :id", { id })
                .getMany();
        };
    }
}
exports.default = new MessageService();
//# sourceMappingURL=messageService.js.map