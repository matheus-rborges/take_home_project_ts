import { Body, Controller, Get, HttpCode, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AnswersDTO } from "../../dtos";
import { QuestionsService } from "../../providers";

@Controller("questions")
@ApiTags("questions")
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Get()
  @HttpCode(200)
  async get() {
    return this.questionsService.getRandomQuestions();
  }

  @Post("/answer")
  @HttpCode(200)
  async answer(@Body() answers: AnswersDTO) {
    return this.questionsService.correctQuiz(answers.answers);
  }
}
