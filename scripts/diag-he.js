// Diagnostic: does activating @tailwindcss/node's resolve hook (He)
// break loading @tailwindcss/oxide's native binding, standalone?
const Module = require("module");

// Log every resolution to see parent paths + results
const origResolve = Module._resolveFilename;
Module._resolveFilename = function (request, parent, ...rest) {
  try {
    const res = origResolve.call(this, request, parent, ...rest);
    if (request.includes("oxide") || request.includes(".node")) {
      console.log(`  RESOLVE "${request}" from ${parent && parent.filename} -> ${res}`);
    }
    return res;
  } catch (e) {
    if (request.includes("oxide") || request.includes(".node")) {
      console.log(`  RESOLVE-FAIL "${request}" from ${parent && parent.filename}: ${e.message.split("\n")[0]}`);
    }
    throw e;
  }
};

console.log("--- loading @tailwindcss/node (activates He) ---");
try {
  require("@tailwindcss/node");
  console.log("  @tailwindcss/node loaded (He registered)");
} catch (e) {
  console.log("  @tailwindcss/node load error: " + e.message.split("\n")[0]);
}

console.log("--- now requiring @tailwindcss/oxide ---");
try {
  const oxide = require("@tailwindcss/oxide");
  console.log("  OXIDE LOAD OK: " + typeof oxide);
} catch (e) {
  console.log("  OXIDE LOAD FAIL: " + e.message.split("\n")[0]);
}
