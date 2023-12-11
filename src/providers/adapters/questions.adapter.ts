import { IQuestions } from "src/interfaces";
import { BaseAdapter } from "./base.adapter";

export class QuestionsAdapter extends BaseAdapter<
  { id: number; question: string; alternatives: string },
  IQuestions
> {
  parse(): IQuestions {
    return {
      id: this.input.id,
      question: this.input.question,
      alternatives: JSON.parse(this.input.alternatives),
    };
  }
}
