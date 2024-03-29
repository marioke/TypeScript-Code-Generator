import { AliasTypeBuilder } from "./AliasTypeBuilder";
import { ClassBuilder } from "./ClassBuilder";
import { InterfaceBuilder } from "./InterfaceBuilder";
import { StringBuilder } from "./StringBuilder";
import { TypeBuilder } from "./TypeBuilder";

export class CodeDocument {
  private classes = new Array<ClassBuilder>();
  private interfaces = new Array<InterfaceBuilder>();
  private types = new Array<TypeBuilder>();
  private aliasTypes = new Array<AliasTypeBuilder>();
  private headComments: Array<string> = [];
  private imports = new Array<Import>();

  public addClass(classObj: ClassBuilder): this {
    if (this.classes.find((c) => c.getName() === classObj.getName())) {
      throw new Error(`Class with name ${classObj.getName()} already exists`);
    }

    this.classes.push(classObj);
    return this;
  }

  public addImport(importObj: Import): this {
    if (this.imports.find((i) => i.name === importObj.name)) {
      throw new Error(`Import with name ${importObj.name} already exists`);
    }

    this.imports.push(importObj);
    return this;
  }

  public addImports(importObjs: Array<Import>): this {
    importObjs.forEach((importObj) => {
      this.addImport(importObj);
    });
    return this;
  }

  public addInterface(interfaceObj: InterfaceBuilder): this {
    if (this.interfaces.find((i) => i.getName() === interfaceObj.getName())) {
      throw new Error(
        `Interface with name ${interfaceObj.getName()} already exists`
      );
    }
    this.interfaces.push(interfaceObj);
    return this;
  }

  public addHeadComment(comment: string): this {
    this.headComments.push(comment);
    return this;
  }

  public addType(type: TypeBuilder): this {
    this.types.push(type);
    return this;
  }

  public addAliasType(type: AliasTypeBuilder): this {
    this.aliasTypes.push(type);
    return this;
  }

  public toString(): string {
    const builder = new StringBuilder();

    if (this.headComments.length > 0) {
      this.headComments.forEach((comment) => {
        builder.append(`// ${comment}`);
      });
      builder.addNewline();
    }

    if (this.imports.length > 0) {
      this.imports.forEach((importObj) => {
        if (importObj.type === 'named') {
          builder.append(`import { ${importObj.name} } from "${importObj.path}";`);
          return;
        }
        builder.append(`import ${importObj.name} from "${importObj.path}";`);
      });
      builder.addNewline();
    }

    if (this.aliasTypes.length > 0) {
      this.aliasTypes.forEach((type) => {
        builder.appendLines(type.toArray()).addNewline();
      });
    }
    
    if (this.types.length > 0) {
      this.types.forEach((type) => {
        builder.appendLines(type.toArray()).addNewline();
      });
    }

    this.interfaces.forEach((interfaceObj) => {
      builder.appendLines(interfaceObj.toArray()).addNewline();
    });

    this.classes.forEach((classObj) => {
      builder.appendLines(classObj.toArray()).addNewline();
    });

    return builder.toString();
  }
}

interface Import {
  name: string;
  path: string;
  type?: 'default' | 'named'; 
}
