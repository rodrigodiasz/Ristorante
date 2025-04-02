/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/tests/**/*.test.ts"], // <-- Aqui tá o segredo
  moduleFileExtensions: ["ts", "js", "json", "node"],
  clearMocks: true,
};
