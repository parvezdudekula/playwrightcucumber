module.exports = {
  default: [
  '--format', 'allure-cucumberjs/reporter',
    '--format', 'progress',
    '--require-module', 'ts-node/register',
  // '--require', 'src/support/allure-world.ts',
    '--require', 'src/features/**/*.ts',
    '--require', 'src/support/**/*.ts',
    '--require', 'tests/support/**/*.ts'
  ].join(' ')
};
