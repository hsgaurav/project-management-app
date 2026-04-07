/**
 * Developer Check-In Script
 *
 * A simple interactive script that asks the developer for their name
 * and what they are working on today. Useful for standup notes,
 * session logging, or onboarding prompts.
 *
 * Usage:
 *   npx ts-node scripts/dev-checkin.ts
 */

import * as readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim());
    });
  });
}

async function main() {
  console.log("\n👋 Welcome to the Project Management App!\n");

  const name = await ask("What is your name? ");
  const workingOn = await ask("What are you working on today? ");

  console.log(`\nGreat to have you, ${name}!`);
  console.log(`Today's focus: ${workingOn}`);
  console.log("\nHappy coding! 🚀\n");

  rl.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
