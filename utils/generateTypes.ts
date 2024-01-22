// generateTypes.ts
const { execSync } = require("child_process");
const dotenv = require("dotenv");

// Load environment variables from .env
dotenv.config();

// Get the database URL from environment variables or replace 'DATABASE_URL' with your actual variable
const databaseUrl =
  process.env.DATABASE_URL || "http://localhost:3000/api-json";

// Run the openapi-generator-cli command
const command = `npx openapi-generator-cli generate -i ${databaseUrl} -g typescript-axios -o types/generated`;
execSync(command, { stdio: "inherit" });
