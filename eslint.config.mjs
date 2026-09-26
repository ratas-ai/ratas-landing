import js from "@eslint/js";
import tseslint from "typescript-eslint";
import prettierRecommended from "eslint-plugin-prettier/recommended";

export default tseslint.config(
  {
    ignores: ["node_modules/**", "dist/**", ".wrangler/**", ".astro/**"],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  // Chạy Prettier như 1 ESLint rule + tắt rule format xung đột (config-prettier).
  // Phải để CUỐI. Lỗi format sẽ hiện inline trong IDE qua ESLint.
  prettierRecommended,
);
