import { BuilderBase } from "./BuilderBase";
import { StringBuilder } from "./StringBuilder";

export class InterfaceBuilder extends BuilderBase {
  private readonly name: string;
  private properties: Array<InterfaceProperty> = [];
  private implements?: string;
  private export?: boolean;
  private descriptionLines: Array<string> = [];

  public constructor(name: string) {
    super();
    if (!this.isValidObjectName(name)) {
      throw new Error(`Invalid name for interface: ${name}`);
    }
    this.name = name;
  }

  public getName(): string {
    return this.name;
  }

  public withExport(): this {
    this.export = true;
    return this;
  }

  public withImplements(implementsClass: string): this {
    this.implements = implementsClass;
    return this;
  }

  public addProperty(property: InterfaceProperty): this {
    if (this.properties.find((p) => p.name === property.name)) {
      throw new Error(`Property ${property.name} already exists`);
    }
    this.properties.push(property);
    return this;
  }

  public addDescriptionLine(line: string): this {
    this.descriptionLines.push(line);
    return this;
  }

  private getCommentHeader(): Array<string> {
    const results: Array<string> = [];

    if (this.descriptionLines.length === 0) {
      return results;
    }

    results.push(`/**`);

    this.descriptionLines.forEach((line) => {
      results.push(` * ${line}`);
    });

    results.push(` */`);
    return results;
  }

  public toArray(): Array<string> {
    const builder = new StringBuilder();

    if (this.descriptionLines.length > 0) {
      builder.appendLines(this.getCommentHeader());
    }

    const parts = [];

    if (this.export) {
      parts.push("export");
    }

    parts.push("interface");
    parts.push(this.name);

    if (this.implements) {
      parts.push("implements");
      parts.push(this.implements);
    }

    parts.push("{");

    builder.append(parts.join(" "));

    this.properties.forEach((property) => {
      if (property.comment) {
        builder.append(`${this.getIndent(1)}/**`);
        builder.append(`${this.getIndent(1)} * ${property.comment}`);
        builder.append(`${this.getIndent(1)} */`);
      }
      if (property.nullable) {
        builder.append(`${this.getIndent(1)}${property.name}?: ${property.type};`);
        return;
      }
      builder.append(`${this.getIndent(1)}${property.name}: ${property.type};`);
    });
    builder.append("}");
    return builder.toArray();
  }
}

export interface InterfaceProperty {
  name: string;
  type: string;
  comment?: string;
  nullable?: boolean;
}
