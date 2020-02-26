import { getToken } from "./functions/jwt";
import axios from "axios";

export const availableLanguages = [
  "C",
  "C++",
  "Java",
  "JavaScript",
  "Python",
  "Ruby"
];

export const languageGrammar = {
  C: "c",
  "C++": "cpp",
  Java: "java",
  JavaScript: "javascript",
  Python: "python",
  Ruby: "ruby"
};

export const levels = ["Beginner", "Intermediate", "Advanced", "Expert"];
