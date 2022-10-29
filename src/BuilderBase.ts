export abstract class BuilderBase {
  protected getIndent(startPosition: number): string {
    let spaces = startPosition * 2;
    return " ".repeat(spaces);
  }

  protected isValidObjectName(name: string): boolean {
    return /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(name);
  }

  public abstract toArray(): Array<string>;
}
