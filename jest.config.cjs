module.exports = {
    transform: {
        '^.+\\.mjs$': 'babel-jest',
    },
    testEnvironment: 'node',
    testMatch: ['**/tests/**/*.test.mjs'],
};