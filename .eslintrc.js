module.exports = {
    env: {
        node: true,
        commonjs: true
    },
    extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
    overrides: [
        {
            env: {
                node: true,
            },
            files: ["src/index.ts", ".eslintrc.{js,cjs}"], // 'src/**/*.ts',
            parserOptions: {
                sourceType: "script",
            },
        },
    ],
    // eslintIgnore: ["hello.js", "world.js"],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
    },
    plugins: ["@typescript-eslint", "prettier"],
    rules: {
        "prettier/prettier": "error",
        "no-unused-vars": "warn",
        semi: ["error", "always"],
        quotes: ["off", "double"],
        eqeqeq: "error",
        curly: "error",
        "no-const-assign": ["error"], // Disallow reassigning const variables
        "no-dupe-args": ["error"], // Disallow duplicate arguments in function definitions
        "no-empty": ["error"], // Disallow empty block statements
        "no-undef": ["error"], // disallow undeclared variables
        "no-dupe-keys": ["error"], // Disallow duplicate keys in object
        "no-var": "error",
        "no-console": "warn",
        "consistent-return": "error",
        "prefer-const": [
            // let a = 3; if let define then reassign this var
            "error",
            {
                destructuring: "any",
                ignoreReadBeforeAssign: false,
            },
        ],
        '@typescript-eslint/no-var-requires': "off",
        "@typescript-eslint/no-explicit-any": "off",
        // "no-multi-spaces": "error", // if(foo  === "bar") {}
        // "object-shorthand": ["error", "always"],
        // "prefer-destructuring": ["error", "always"],
        // 0: warn, 1: error, 2: off
    },
};
