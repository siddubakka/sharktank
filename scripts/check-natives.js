const { execFileSync } = require("child_process");
const path = require("path");
const fs = require("fs");

function findNodeFiles(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === ".bin") continue;
      findNodeFiles(full, out);
    } else if (entry.name.endsWith(".node")) {
      out.push(full);
    }
  }
  return out;
}

const files = findNodeFiles("node_modules");
console.log(`found ${files.length} binaries`);
let broken = 0;

for (const file of files) {
  let result;
  try {
    result = execFileSync(process.execPath, [path.join(__dirname, "load-one.js"), path.resolve(file)], {
      encoding: "utf8",
      timeout: 30000,
    }).trim();
  } catch (e) {
    result = "EXEC-ERROR";
  }
  const status = result === "OK" ? "OK " : "BAD";
  if (result !== "OK") broken++;
  console.log(`${status} ${file} — ${result}`);
}

console.log(`\nbroken: ${broken}/${files.length}`);
process.exit(broken > 0 ? 1 : 0);
