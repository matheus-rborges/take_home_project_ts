import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, ValidateIf } from "class-validator";
import { ANSWER_PROPERTIES } from "src/constants";

export class AnswerDTO {
  @IsNumber()
  @ApiProperty(ANSWER_PROPERTIES.ID)
  id: number;

  @IsString()
  @ApiProperty(ANSWER_PROPERTIES.ANSWER)
  answer: "string";
}
