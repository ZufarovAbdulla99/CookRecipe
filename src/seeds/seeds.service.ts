import { User, UserRoles } from "@modules";
import { Injectable, OnModuleInit } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export class SeedsService  implements OnModuleInit {
    constructor(@InjectModel(User) private userModel: typeof User) {}

    async onModuleInit() {
        await this.seedUsers()
    }

    async seedUsers() : Promise<void> {
        const usersCount = await this.userModel.count()

        if(usersCount == 0) {
            await this.userModel.create({
                id: 1,
                first_name: "Abdulla",
                last_name: "Zufarov",
                username: "abdulla_zufarov",
                email: "zufarovabdulla@gmail.com",
                password: "$2b$12$Co1KFMw7VTIG/WuRrHaE7eFGqVmhW6ZcU7KE4T8XZAy2RspGPSDfS",
                role: UserRoles.admin
              })
        }
    }
}