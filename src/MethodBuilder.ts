import { BuilderBase } from "./BuilderBase";
import { StringBuilder } from "./StringBuilder";

export class MethodBuilder extends BuilderBase {
  private readonly name: string;
  private visibility: "public" | "private" | "protected" = "public";
  private returnType: string = "void";
  private async: boolean = false;
  private static: boolean = false;
  private descriptionLines: Array<string> = [];

  private parameters: Array<MethodParameter> = [];
  private lines: Array<string> = [];

  public constructor(name: string) {
    super();
    if (!this.isValidObjectName(name)) {
      throw new Error(`Invalid name for method: ${name}`);
    }
    this.name = name;
  }

  public setPrivate(): this {
    this.visibility = "private";
    return this;
  }

  public setPublic(): this {
    this.visibility = "public";
    return this;
  }

  public setProtected(): this {
    this.visibility = "protected";
    return this;
  }

  public setReturnType(type: string): this {
    this.returnType = type;
    return this;
  }

  public setAsync(): this {
    this.async = true;
    return this;
  }

  public addDescriptionLine(line: string): this {
    this.descriptionLines.push(line);
    return this;
  }

  public addParameter(options: MethodParameter): this {
    this.parameters.push(options);
    return this;
  }

  public addLine(line: string): MethodBuilder {
    this.lines.push(line);
    return this;
  }

  public addLines(lines: Array<string>): MethodBuilder {
    lines.forEach((line) => {
      this.addLine(line);
    });
    return this;
  }

  private getMethodBase(): string {
    const parts = [];
    parts.push(this.visibility);

    if (this.static) {
      parts.push("static");
    }

    if (this.async) {
      parts.push("async");
    }

    parts.push(this.name);
    const base = parts.join(" ");

    const returnType = this.async
      ? `Promise<${this.returnType}>`
      : this.returnType;

    return `${base}(${this.getMethodParameters()}): ${returnType}`;
  }

  private getCommentHeader(): Array<string> {
    const results: Array<string> = [];

    if (this.descriptionLines.length === 0 && this.parameters.length === 0) {
      return results;
    }

    results.push(`/**`);

    this.descriptionLines.forEach((line) => {
      results.push(` * ${line}`);
    });

    this.parameters.forEach((parameter) => {
      if (parameter.comment) {
        results.push(` * @param ${parameter.name} ${parameter.comment}`);
      } else {
        results.push(` * @param ${parameter.name}`);
      }
    });

    results.push(` */`);
    return results;
  }

  public toArray(): Array<string> {
    const builder = new StringBuilder();

    const commentLines = this.getCommentHeader();

    commentLines.forEach((line) => {
      builder.append(line);
    });

    builder.append(`${this.getMethodBase()} {`);

    let indentCounter = 1;

    for (let i = 0; i < this.lines.length; i++) {
      const line = this.lines[i];

      if (line.endsWith("{")) {
        indentCounter++;
      }

      if (line.startsWith("}") && indentCounter > 0) {
        indentCounter--;
      }

      builder.append(line, indentCounter);
    }

    builder.append(`}`);

    return builder.toArray();
  }

  private getMethodParameters(): string {
    const results: Array<string> = [];
    this.parameters.forEach((parameter) => {
      const optionalSign = parameter.optional ? "?" : "";
      results.push(`${parameter.name}${optionalSign}: ${parameter.type}`);
    });
    return results.join(", ");
  }
}

export type MethodParameter = {
  name: string;
  type: string;
  comment?: string;
  optional?: boolean;
};
