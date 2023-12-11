import { IsArray, ValidateNested } from "class-validator";
import { AnswerDTO } from "./AnswerDTO";
import { Type } from "class-transformer";

export class AnswersDTO {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AnswerDTO)
  answers: Array<AnswerDTO>;
}
