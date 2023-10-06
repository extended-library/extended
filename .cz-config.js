module.exports = {
  types: [
    {
      value: 'feat',
      name: 'A new feature'
    },
    {
      value: 'fix',
      name: 'A bugfix'
    },
    {
      value: 'perf',
      name: 'Performance and other improvement changes (including dependency updates)'
    },
    {
      value: 'refactor',
      name: 'Rename, restructure, reorganize code or files'
    },
    {
      value: 'test',
      name: 'Adding or fixing tests'
    },
    {
      value: 'style',
      name: 'Code style changes (e.g.: linting issues, white-space, formatting, ...)'
    },
    {
      value: 'docs',
      name: 'Documentation changes'
    },
    {
      value: 'build',
      name: 'Build system or external dependency changes (e.g.: npm, webpack, gulp, ...)'
    },
    {
      value: 'ci',
      name: 'CI/CD changes (e.g.: GitHub Actions, BrowserStack, SauceLabs, ...)'
    },
    {
      value: 'chore',
      name: 'Other types of changes'
    }
  ],
  scopes: [
    { name: 'root' },
    { name: 'async' },
    { name: 'result' },
    { name: 'time' },
    { name: 'values' },
  ],
  messages: {
    type: 'Select the type of change that you\'re committing',
    customScope: 'Denote the SCOPE of this change',
    customScopeEntry: 'Custom scope...',
    scope: 'Denote the SCOPE of this change (optional)',
    subject: 'Write a SHORT, IMPERATIVE tense description of the change',
    body: 'Provide a LONGER description of the change (optional). Use "|" to break new line',
    breaking: 'List any BREAKING CHANGES (optional)',
    footer: 'List any ISSUES CLOSED by this change (optional). E.g.: #31, #34'
  },
  allowCustomScopes: true,
  subjectLimit: 100,
}
