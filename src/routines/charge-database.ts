import { UtilsService } from "../providers/services/utils.service";
import * as questions from "../../questions.json";
import { QuestionRepository } from "../providers/repositories/question.repository";
import { PrismaService } from "../providers/services/prisma.service";

const ALTERNATIVES_MAP = ["A", "B", "C", "D"];

const shuffleAndFormatAlternatives = (
  alternativesArray: string[],
  correctAnswer: string
) => {
  const hasTheAnswerOnDistractors = alternativesArray.includes(correctAnswer);

  const alternatives = [
    ...alternativesArray,
    ...(hasTheAnswerOnDistractors ? [] : [correctAnswer]),
  ];

  const utilsService = new UtilsService();

  const shuffleArray = alternatives.map((alternative) => ({
    shuffleId: utilsService.randomNumber(0, 1000),
    alternative,
  }));

  const sortedArray = shuffleArray.sort((a, b) => a.shuffleId - b.shuffleId);

  return sortedArray.reduce(
    ([alternatives_, correctAnswer_], { alternative }, index) => {
      const letter = ALTERNATIVES_MAP[index];
      return [
        { ...alternatives_, [letter]: alternative },
        alternative === correctAnswer ? letter : correctAnswer_,
      ];
    },
    [{}, null]
  );
};

const format = (data: any) => {
  let alternativesArray = [
    data.distractor1,
    data.distractor2,
    data.distractor3,
  ];

  const [alternatives, answer] = shuffleAndFormatAlternatives(
    alternativesArray,
    data.correct_answer
  );

  return {
    question: data.question,
    alternatives: JSON.stringify(alternatives),
    answer,
    support: data.support,
  };
};

export const chargeDatabase = async () => {
  const _questions = questions.questions.slice(0, 600);

  const formattedQuestions = _questions.map(format);

  const questionRepository = new QuestionRepository(
    new PrismaService(),
    new UtilsService()
  );

  for (const question of formattedQuestions) {
    await questionRepository.create(question);
  }
};

chargeDatabase();
