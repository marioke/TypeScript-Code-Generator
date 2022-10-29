import { BuilderBase } from "./BuilderBase";
import { StringBuilder } from "./StringBuilder";

export class ClassConstructorBuilder extends BuilderBase {
  private lines: Array<string> = [];
  private parameters: Array<{ name: string; type: string; comment?: string }> =
    [];
  private readonly comment?: string;
  private visibility: "public" | "private" | "protected" = "public";

  constructor() {
    super();
  }

  public setPublic(): this {
    this.visibility = "public";
    return this;
  }

  public setPrivate(): this {
    this.visibility = "private";
    return this;
  }

  public setProtected(): this {
    this.visibility = "protected";
    return this;
  }

  public addParameter(options: {
    name: string;
    type: string;
    comment?: string;
  }): this {
    this.parameters.push(options);
    return this;
  }

  public addLine(sLine: string) {
    this.lines.push(sLine);
  }

  private getCommentHeader(): Array<string> {
    const results: Array<string> = [];

    if (!this.comment || this.parameters.length === 0) {
      return results;
    }

    results.push(`/**`);

    if (this.comment) {
      results.push(` * ${this.comment}`);
    }

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
    const comments = this.getCommentHeader();
    builder.appendLines(comments);
    builder.append(`${this.visibility} constructor(${this.getParameters()}) {`);
    this.lines.forEach((line) => {
      builder.append(`${this.getIndent(1)}${line}`);
    });
    return builder.toArray();
  }

  private getParameters(): string {
    const aResult: Array<string> = [];
    this.parameters.forEach((oParameter) => {
      aResult.push(`${oParameter.name}: ${oParameter.type}`);
    });
    return aResult.join(", ");
  }
}
