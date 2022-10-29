# TypeScript Code Generator

![Build](https://github.com/marioke/TypeScript-Code-Generator/actions/workflows/node.js.yml/badge.svg)

## Example usage

```TypeScript
const doc = new CodeDocument()
    .addHeadComment("Example file")
    .addHeadComment("This is completely auto generated")
    .addClass(
    new ClassBuilder("ExampleClass").addMethod(
        new MethodBuilder("hello")
        .addDescriptionLine("This is a method")
        .addParameter({
            name: "name",
            type: "string",
            comment: "The name of the person to greet",
        })
        .addLine("console.log('hello ' + name);")
    )
);

console.log(doc.toString())
```

## Example output

```TypeScript
// Example file
// This is completely auto generated

class ExampleClass {

  /**
   * This is a method
   * @param name The name of the person to greet
   */
  public hello(name: string): void {
    console.log('hello ' + name);
  }

}
```

## Get started

```Bash
npm i typescript-code-generator
```
