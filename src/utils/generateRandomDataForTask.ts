import { generate } from "random-words";

export function generateRandomDataForTask() {
  let title = "";
  let description = "";

  const priorityOptions = ["High", "Medium", "Low"];
  const descriptionWords = generate(30);
  const titleWords = generate(6);

  if (Array.isArray(titleWords)) {
    title = titleWords.join(" ");
  }

  if (Array.isArray(descriptionWords)) {
    description = descriptionWords.join(" ");
  }
  return {
    title,
    description,
    priority:
      priorityOptions[Math.floor(Math.random() * priorityOptions.length)],
  };
}
