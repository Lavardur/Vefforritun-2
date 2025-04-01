module.exports = {
  'pre-commit': 'cd "$(git rev-parse --show-toplevel)" && npm run format',
};