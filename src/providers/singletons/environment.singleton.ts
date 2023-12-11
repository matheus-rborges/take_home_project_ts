import * as dotenv from "dotenv";
import { MissingEnvsException } from "../../errors";

dotenv.config();

export class Environment {
  private static instance: Environment;

  constructor() {}

  static getInstance() {
    if (!Environment.instance) {
      Environment.instance = new Environment();
    }
    return Environment.instance;
  }

  static initialize = () => {
    const env = process.env;

    if (env.SECRET) {
      const secret = JSON.parse(env.SECRET.replace(/\\/g, "").trim());
      Object.keys(secret).forEach((key) => {
        env[key] = secret[key];
      });

      delete process.env["SECRET"];
    }

    const instance = Environment.getInstance();

    Object.keys(env).forEach((key) => (instance[key] = env[key]));
  };

  static checkEnvironment() {
    const envs = this.getInstance();
    const envsKeys = Object.keys(new Environment());

    const missingEnvs = envsKeys.filter((env) => !envs[env]);
    if (missingEnvs.length) {
      throw new MissingEnvsException({ missingEnvs });
    }
  }
}
