import { BuilderBase } from "./BuilderBase";

export class ClassPropertyBuilder extends BuilderBase {
  private readonly name: string;
  private readonly type: string = "any";
  private visibility: "public" | "private" | "protected" = "public";
  private static: boolean = false;
  private readonly: boolean = false;

  public constructor(name: string, type: string) {
    super();
    if (!this.isValidObjectName(name)) {
      throw new Error(`Invalid name for property: ${name}`);
    }
    this.name = name;
    this.type = type;
  }

  public getName(): string {
    return this.name;
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

  public setStatic(): this {
    if (this.readonly) {
      throw new Error(
        `Cannot set a property ${this.name} to static and readonly`
      );
    }
    this.static = true;
    return this;
  }

  public setReadonly(): this {
    if (this.static) {
      throw new Error(
        `Cannot set a property ${this.name} to static and readonly`
      );
    }
    this.readonly = true;
    return this;
  }

  public toArray(): Array<string> {
    const parts = [];

    parts.push(`${this.visibility}`);

    if (this.static) {
      parts.push("static");
    }

    if (this.readonly) {
      parts.push("readonly");
    }

    parts.push(`${this.name}: ${this.type};`);

    return [parts.join(" ")];
  }
}
