module.exports = {
  preset: 'jest-expo',
  transform: {
    '\\.js$': '<rootDir>/jest/preprocessor.js',
  },
};
