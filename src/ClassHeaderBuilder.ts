import { BuilderBase } from "./BuilderBase";
import { StringBuilder } from "./StringBuilder";

export class ClassHeaderBuilder extends BuilderBase {
  private authorAttribute?: string;
  private extendsAttribute?: string;
  private classAttribute?: string;
  private aliasAttribute?: string;
  private descriptionLines: Array<string> = [];

  public constructor() {
    super();
  }

  public withAuthorAttribute(author: string): this {
    this.authorAttribute = author;
    return this;
  }

  public withExtendsAttribute(extendsClass: string): this {
    this.extendsAttribute = extendsClass;
    return this;
  }

  public withClassAttribute(classAttribute: string): this {
    this.classAttribute = classAttribute;
    return this;
  }

  public withAliasAttribute(aliasAttribute: string): this {
    this.aliasAttribute = aliasAttribute;
    return this;
  }

  public addDescriptionLine(line: string): this {
    this.descriptionLines.push(line);
    return this;
  }

  public toArray(): Array<string> {
    if (
      !this.authorAttribute &&
      !this.extendsAttribute &&
      !this.classAttribute &&
      !this.aliasAttribute &&
      this.descriptionLines.length === 0
    ) {
      return [];
    }

    const builder = new StringBuilder();
    builder.append("/**");

    if (this.descriptionLines.length > 0) {
      this.descriptionLines.forEach((line) => {
        builder.append(` * ${line}`);
      });
      builder.addNewline();
    }

    if (this.authorAttribute) {
      builder.append(` * @author ${this.authorAttribute}`);
    }
    if (this.extendsAttribute) {
      builder.append(` * @extends ${this.extendsAttribute}`);
    }
    if (this.classAttribute) {
      builder.append(` * @class ${this.classAttribute}`);
    }
    if (this.aliasAttribute) {
      builder.append(` * @alias ${this.aliasAttribute}`);
    }

    builder.append(" */");
    return builder.toArray();
  }
}
