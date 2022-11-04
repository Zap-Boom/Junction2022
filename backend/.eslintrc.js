module.exports = {
  env: {
    es2021: true,
    node: true
  },
  extends: ['standard-with-typescript', 'prettier'],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json'],  //required for "type-aware linting"
  },
  plugins: [
    //load the previously installed plugin; allows me to use the rules within my codebase
    '@typescript-eslint',
  ],
  rules: {
  }
}
