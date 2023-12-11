import { Injectable } from "@nestjs/common";
import util from "util";

@Injectable()
export class UtilsService {
  formatString(string: String, replacements: Record<string, string>) {
    return string.replace(/{(\w+)}/g, (match: string, field: string) => {
      return replacements[field] || match;
    });
  }

  logFullObject(object: Record<string, unknown>): void {
    // eslint-disable-next-line no-console
    console.log(util.inspect(object, false, null, true));
  }

  sample<T>(array: Array<T>): T {
    return array?.[Math.floor(Math.random() * array.length)];
  }

  randomNumber(min: number, max: number): number {
    return Math.max(min, Math.floor(Math.random() * max));
  }
}
