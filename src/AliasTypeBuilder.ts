import { BuilderBase } from "./BuilderBase";
import { StringBuilder } from "./StringBuilder";

export class AliasTypeBuilder extends BuilderBase {
    private readonly name: string;
    private readonly type: string;
    private export?: boolean;
    private descriptionLines: Array<string> = [];

    public constructor(name: string, type: string) {
        super();
        if (!this.isValidObjectName(name)) {
            throw new Error(`Invalid name for type: ${name}`);
        }
        this.name = name;
        this.type = type;
    }

    public getName(): string {
        return this.name;
    }

    public withExport(): this {
        this.export = true;
        return this;
    }

    public addDescriptionLine(line: string): this {
        this.descriptionLines.push(line);
        return this;
    }

    public toArray(): Array<string> {
        const builder = new StringBuilder();

        if (this.descriptionLines.length > 0) {
            builder.append("/**");
            this.descriptionLines.forEach((line) => {
                builder.append(` * ${line}`);

            });
            builder.append(" */");
        }

        const parts = [];
        if (this.export) {
            parts.push("export");
        }
        parts.push("type");
        parts.push(this.name);
        parts.push("=");
        parts.push(this.type);
        builder.append(parts.join(" "));
        return builder.toArray();
    }
}
