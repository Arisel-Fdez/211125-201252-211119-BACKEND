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
exports.setupRabbitMQ = void 0;
const amqplib_1 = __importDefault(require("amqplib"));
function setupRabbitMQ() {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield amqplib_1.default.connect('amqp://open-bait-production.up.railway.app');
        const channel = yield connection.createChannel();
        const queueName = 'act-queue';
        const exchangeName = 'create-act';
        const routingKey = 'create.acount';
        yield channel.assertQueue(queueName);
        yield channel.bindQueue(queueName, exchangeName, routingKey);
        return { connection, channel, queueName };
    });
}
exports.setupRabbitMQ = setupRabbitMQ;
