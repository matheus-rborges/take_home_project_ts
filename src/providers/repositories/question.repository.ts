import { Inject, Injectable } from "@nestjs/common";
import { PrismaService } from "../services/prisma.service";
import { QuestionsAdapter } from "../adapters/questions.adapter";
import { UtilsService } from "../services";
import { TArrayElement } from "src/@types/array-element.type";

@Injectable()
export class QuestionRepository {
  constructor(
    @Inject(PrismaService) private prismaService: PrismaService,
    @Inject(UtilsService) private utilsService: UtilsService
  ) {}

  async create(data: any) {
    return await this.prismaService.questions.create({ data });
  }

  async getRandom(top = 10) {
    const questionsCount = await this.prismaService.questions.count();

    const sortKeys = ["id", "question"];
    const directions = ["asc", "desc"];

    const sortKey = this.utilsService.sample(sortKeys);
    const direction = this.utilsService.sample(directions);
    const skip = Math.max(0, Math.floor(Math.random() * questionsCount) - top);

    const questions = await this.prismaService.questions.findMany({
      take: top,
      skip,
      orderBy: { [sortKey]: direction as "asc" | "desc" },
    });
    return questions.map((question) => new QuestionsAdapter(question).parse());
  }

  async getFromIds(ids: Array<number>) {
    const questions = await this.prismaService.questions.findMany({
      where: {
        id: { in: ids },
      },
    });
    return questions;
  }
}
