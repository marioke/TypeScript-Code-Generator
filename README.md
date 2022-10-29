# TypeScript Code Generator

![Build](https://github.com/marioke/TypeScript-Code-Generator/actions/workflows/node.js.yml/badge.svg)

## Example usage

```TypeScript
const doc = new CodeDocument()
    .addHeadComment("Example file")
    .addHeadComment("This is completely auto generated")
    .addInterface(
        new InterfaceBuilder("HelloWorldOptions").addProperty({
            name: "name",
            type: "string",
        })
    )
    .addClass(
        new ClassBuilder("ExampleClass").addMethod(
            new MethodBuilder("hello")
                .addDescriptionLine("This is a method")
                .addParameter({
                    name: "options",
                    type: "HelloWorldOptions",
                    comment: "Options for the hello method",
                })
                .addLines([
                    "if(!options.name) {",
                    "throw new Error(`YIKES! It looks like you're unknown`);",
                    "}",
                    "console.log('Hello ' + options.name);",
                ])
        )
    );

console.log(doc.toString())
```

## Example output

```TypeScript
// Example file
// This is completely auto generated

interface HelloWorldOptions {
  name: string;
}

class ExampleClass {
  /**
   * This is a method
   * @param options Options for the hello method
   */
  public hello(options: HelloWorldOptions): void {
    if (!options.name) {
      throw new Error(`YIKES! It looks like you're unknown`);
    }
    console.log("Hello " + options.name);
  }
}

```

## Get started

```Bash
npm i typescript-code-generator
```
