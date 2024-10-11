// import { User, UserRoles } from "@modules";
import { Injectable, OnModuleInit } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export class SeedsService  implements OnModuleInit {
    // constructor(@InjectModel(User) private userModel: typeof User) {}

    async onModuleInit() {
        await this.seedUsers()
    }

    async seedUsers() : Promise<void> {
        // const usersCount = await this.userModel.count()

        // if(usersCount == 0) {
        //     await this.userModel.create({
        //         name: "Abrorbek Abdulxamidov",
        //         email: "abdulkhamidovabrorbek@gmail.com",
        //         phone: "+998939386462",
        //         role: UserRoles.admin
        //     })
        // }
    }
}