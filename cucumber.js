module.exports = {
  default: [
    '--format', '@cucumber/html-formatter',
    '--require-module', 'ts-node/register',
    '--require', 'src/features/**/*.ts',
    '--require', 'src/support/**/*.ts',
    '--require', 'tests/support/**/*.ts'
  ].join(' ')
};
