const file = process.argv[2];
try {
  require(file);
  console.log("OK");
} catch (e) {
  console.log("FAIL: " + String(e.message).split("\n")[0]);
}
