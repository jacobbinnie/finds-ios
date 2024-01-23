// generateTypes.ts
const { execSync } = require("child_process");
const dotenv = require("dotenv");

// Load environment variables from .env
dotenv.config();

const databaseUrl = `${process.env.EXPO_PUBLIC_API_URL}/api-json`;

// Run the openapi-generator-cli command
const command = `npx openapi-generator-cli generate -i ${databaseUrl} -g typescript-axios -o types/generated`;
execSync(command, { stdio: "inherit" });
