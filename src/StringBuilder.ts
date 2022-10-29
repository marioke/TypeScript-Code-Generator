export class StringBuilder {
  private contents: Array<string> = [];

  public append(line: string, indent: number = 0): this {
    let space = "";
    if (indent > 0) {
      space = " ".repeat(indent * 2);
    }
    this.contents.push(`${space}${line}`);
    return this;
  }

  public appendLines(lines: Array<string>, indent: number = 0): this {
    let space = "";
    if (indent > 0) {
      space = " ".repeat(indent * 2);
    }
    lines.forEach((line) => {
      this.append(`${space}${line}`);
    });
    return this;
  }

  public addNewline(): this {
    this.contents.push("");
    return this;
  }

  public addNewlines(count: number): this {
    for (let i = 0; i < count; i++) {
      this.addNewline();
    }
    return this;
  }

  public toString(): string {
    return this.contents.join("\n");
  }

  public toArray(): Array<string> {
    return this.contents;
  }

  public clear(): this {
    this.contents = [];
    return this;
  }
}
