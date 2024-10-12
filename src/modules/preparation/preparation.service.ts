import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Preparation } from './models';
import { ICreatePreparationRequest, IUpdatePreparationRequest } from './interfaces';

@Injectable()
export class PreparationService {
  constructor(@InjectModel(Preparation) private preparationModel: typeof Preparation) {}

  async getAllPreparations(): Promise<Preparation[] | string> {
    const preparations = await this.preparationModel.findAll({
      include: [],
    });
    if (!preparations) {
      return 'Any preparation not found';
    }
    return preparations;
  }

  async getPreparationById(preparationId: number): Promise<Preparation | string> {
    const preparation = await this.preparationModel.findByPk(preparationId, {
      include: [],
    });
    if (!preparation) {
      return 'Preparation not found';
    }
    return preparation;
  }

  async createPreparation(payload: ICreatePreparationRequest): Promise<void> {
    await this.preparationModel.create({
        steps: payload.steps
    });
  }

  async updatePreparation(
    preparationId: number,
    payload: IUpdatePreparationRequest,
  ): Promise<void | string> {
    const existPreparation = await this.preparationModel.findByPk(preparationId);

    if (!existPreparation) {
      return "Preparation not found";
    }

    await existPreparation.update({
        steps: payload.steps
    });
  }

  async deletePreparation(preparationId: number): Promise<void | string> {
    const existPreparation = await this.preparationModel.findByPk(preparationId);

    if (!existPreparation) {
      return 'Preparation not found';
    }

    await this.preparationModel.destroy({ where: { id: preparationId } });
  }

  async deleteAllPreparations(): Promise<void | string> {
    const allPreparations = await this.preparationModel.findAll();

    if (!allPreparations[0]?.dataValues) {
      return 'Any Preparation not found';
    }

    await this.preparationModel.truncate();
  }
}