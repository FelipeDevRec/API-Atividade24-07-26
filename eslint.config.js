module.exports = [
  {
    ignores: ["node_modules/**"]
  },
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "commonjs",
      globals: {
        process: "readonly",
        console: "readonly",
        require: "readonly",
        module: "readonly",
        __dirname: "readonly"
      }
    },
    rules: {
      "no-unused-vars": "warn",
      "no-console": "off"
    }
  }
];
