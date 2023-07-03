const typescriptEslint = require("@typescript-eslint/eslint-plugin");
const typescriptParser = require("@typescript-eslint/parser");
const simpleImportSort = require("eslint-plugin-simple-import-sort");

module.exports = [
  {
    "files": ["**/*.js", "**/*.ts", "**/*.tsx"],
    "languageOptions": {
      "sourceType": "module",
      "ecmaVersion": "latest",
      "parser": typescriptParser,
    },
    "plugins": {
      "@typescript-eslint": typescriptEslint,
      "simple-import-sort": simpleImportSort,
    },
    "rules": {
      "indent": [
        "error",
        2
      ],
      "linebreak-style": [
        "error",
        "unix"
      ],
      "quotes": [
        "error",
        "double"
      ],
      "semi": [
        "error",
        "always"
      ],
      "simple-import-sort/exports": "error",
      "simple-import-sort/imports": ["error",
        {
          "groups": [
            ["^react", "^next?\\w"],
            ["^\\u0000", "^"],
            ["^@/\\w"],
            ["^\\."]]
        }
      ]
    }
  }
];
