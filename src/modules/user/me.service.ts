import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./models";
// import { Order, OrderItem } from "../order";
// import { Review } from "../review";

@Injectable()
export class MeService {
    constructor(@InjectModel(User) private userModel: typeof User) {}

    // async getMe(userId: number) : Promise<User> {
        // return await this.userModel.findByPk(userId, {include: [{model: Order, include: [OrderItem]}, Review]})
    // }     
}