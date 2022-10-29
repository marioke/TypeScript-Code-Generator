import { BuilderBase } from "./BuilderBase";
import { StringBuilder } from "./StringBuilder";

export class TypeBuilder extends BuilderBase {
  private readonly name: string;
  private properties: Array<{ name: string; type: string }> = [];
  private export?: boolean;

  public constructor(name: string) {
    super();
    if (!this.isValidObjectName(name)) {
      throw new Error(`Invalid name for type: ${name}`);
    }
    this.name = name;
  }

  public getName(): string {
    return this.name;
  }

  public addProperty(property: { name: string; type: string }): this {
    if (this.properties.find((p) => p.name === property.name)) {
      throw new Error(`Property ${property.name} already exists`);
    }
    this.properties.push(property);
    return this;
  }

  public withExport(): this {
    this.export = true;
    return this;
  }

  public toArray(): Array<string> {
    const builder = new StringBuilder();
    const parts = [];
    if (this.export) {
      parts.push("export");
    }
    parts.push("type");
    parts.push(this.name);
    parts.push("{");
    builder.append(parts.join(" "));
    this.properties.forEach((property) => {
      builder.append(`${this.getIndent(1)}${property.name}: ${property.type};`);
    });
    builder.append("}");
    return builder.toArray();
  }
}
