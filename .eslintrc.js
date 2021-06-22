module.exports = {
    root: true,
    overrides: [
        {
            files: ["*.ts"],
            parserOptions: {
                project: [
                    "tsconfig.*?.json",
                ],
                createDefaultProgram: true
            },
            extends: ["plugin:@angular-eslint/recommended"],
            rules: {
                "max-len": ["error", { "code": 140 }],
                "no-unused-variable": 0
            }
        },
        {
            files: ["*.component.html"],
            extends: ["plugin:@angular-eslint/template/recommended"],
            rules: {
                "max-len": ["error", { "code": 140 }]
            }
        },
        {
            files: ["*.component.ts"],
            extends: ["plugin:@angular-eslint/template/process-inline-templates"]
        }
    ]
}