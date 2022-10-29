import { MethodBuilder } from "./MethodBuilder";
import { ClassPropertyBuilder } from "./ClassPropertyBuilder";
import { ClassConstructorBuilder } from "./ClassConstructorBuilder";
import { StringBuilder } from "./StringBuilder";
import { BuilderBase } from "./BuilderBase";
import { ClassHeaderBuilder } from "./ClassHeaderBuilder";

export class ClassBuilder extends BuilderBase {
  private readonly name: string;
  private methods: Array<MethodBuilder> = [];
  private properties: Array<ClassPropertyBuilder> = [];
  private constructors: Array<ClassConstructorBuilder> = [];
  private export?: boolean;
  private exportDefault?: boolean;
  private extends?: string;
  private header?: ClassHeaderBuilder;

  public constructor(name: string) {
    super();
    if (!this.isValidObjectName(name)) {
      throw new Error(`Invalid class name: ${name}`);
    }
    this.name = name;
  }

  public getName(): string {
    return this.name;
  }

  public withExport(exportAsDefault: boolean = false): this {
    this.export = true;
    this.exportDefault = exportAsDefault;
    return this;
  }

  public addMethod(method: MethodBuilder): this {
    this.methods.push(method);
    return this;
  }

  public addProperty(property: ClassPropertyBuilder): this {
    if (this.properties.find((p) => p.getName() === property.getName())) {
      throw new Error(`Property ${property.getName()} already exists`);
    }
    this.properties.push(property);
    return this;
  }

  public addConstructor(constructor: ClassConstructorBuilder): this {
    this.constructors.push(constructor);
    return this;
  }

  public withHeader(header: ClassHeaderBuilder): this {
    this.header = header;
    return this;
  }

  public withExtends(extendsClass: string): this {
    this.extends = extendsClass;
    return this;
  }

  private getClassBase(): string {
    const parts = [];

    if (this.export) {
      parts.push("export");
      if (this.exportDefault) {
        parts.push("default");
      }
    }

    parts.push("class");
    parts.push(this.name);

    if (this.extends) {
      parts.push("extends");
      parts.push(this.extends);
    }

    return parts.join(" ");
  }

  public toArray(): Array<string> {
    const builder = new StringBuilder();

    if (this.header) {
      builder.appendLines(this.header.toArray());
    }

    builder.append(`${this.getClassBase()} {`).addNewline();

    this.properties.forEach((property) => {
      builder.appendLines(property.toArray(), 1);
    });
    builder.addNewline();

    this.constructors.forEach((constructor) => {
      builder.appendLines(constructor.toArray()).addNewline();
    });

    this.methods.forEach((method) => {
      builder.appendLines(method.toArray(), 1).addNewline();
    });

    builder.append("}");
    return builder.toArray();
  }
}
