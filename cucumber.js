module.exports = {
  default: `--format-options '{"snippetInterface": "async-await"}' --require-module ts-node/register/transpile-only --require ./tests/steps/**/*.ts --require ./tests/support/**/*.ts --require ./tests/support/hooks.ts`
};
