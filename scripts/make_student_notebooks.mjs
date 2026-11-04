// Copies the textbook's notebooks, models, data, and images into the
// ../student-notebooks folder (the malloy-textbook-notebooks repo), so the website and
// the VS Code notebooks always come from the same source files.
//
//   npm run student
import fs from "fs";
import path from "path";

const SRC = path.resolve("src/textbook");
const OUT = path.resolve(process.argv[2] ?? "../student-notebooks");

const KEEP_EXT = new Set([".malloynb", ".malloy", ".py", ".csv", ".parquet", ".png", ".gif", ".jpg", ".svg"]);

function copyDir(from, to) {
  fs.mkdirSync(to, { recursive: true });
  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    const src = path.join(from, entry.name);
    const dst = path.join(to, entry.name);
    if (entry.isDirectory()) {
      copyDir(src, dst);
    } else if (KEEP_EXT.has(path.extname(entry.name))) {
      fs.copyFileSync(src, dst);
    }
  }
}

copyDir(SRC, OUT);

// The DuckDB connection, rooted at this folder so 'data/...' paths resolve
// no matter how the repository is opened in VS Code.
fs.writeFileSync(
  path.join(OUT, "malloy-config.json"),
  JSON.stringify({ connections: { duckdb: { is: "duckdb" } } }, null, 2) + "\n"
);

fs.copyFileSync(path.resolve("student-README.md"), path.join(OUT, "README.md"));
console.log(`Student notebooks written to ${OUT}`);
