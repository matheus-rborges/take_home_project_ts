import { Inject, Injectable } from "@nestjs/common";
import { QuestionRepository } from "../repositories";
import { AnswerDTO } from "src/dtos";

@Injectable()
export class QuestionsService {
  constructor(
    @Inject(QuestionRepository)
    private readonly questionRepository: QuestionRepository
  ) {}

  getRandomQuestions() {
    return this.questionRepository.getRandom();
  }

  async correctQuiz(answers: Array<AnswerDTO>) {
    const questionIds = answers.map(({ id }) => id);

    const questions = await this.questionRepository.getFromIds(questionIds);

    const review = answers.map((answer) => {
      const question = questions.find(({ id }) => id === answer.id);

      return {
        ...answer,
        expect: question.answer,
        correct: question.answer === answer.answer,
        support: question.support,
      };
    });

    const rightAnswers = review.filter(({ correct }) => correct);

    const percentage = (rightAnswers.length / answers.length) * 100;

    const grade = {
      percentage: percentage.toFixed(2),
      grade:
        (percentage === 100 && "S") ||
        (percentage > 90 && "A") ||
        (percentage >= 90 && "A") ||
        (percentage >= 80 && "B") ||
        (percentage >= 70 && "C") ||
        (percentage >= 60 && "D") ||
        (percentage < 60 && "F"),
    };

    return {
      review,
      grade,
    };
  }
}
