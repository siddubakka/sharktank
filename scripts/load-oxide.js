try {
  const oxide = require("@tailwindcss/oxide");
  console.log("PARENT LOAD OK:", typeof oxide);
} catch (e) {
  console.log("PARENT LOAD FAIL:");
  console.log(e && e.message ? e.message : e);
  if (e && e.errors) {
    console.log("--- aggregated loadErrors ---");
    for (const err of e.errors) console.log(String(err.message || err));
  }
}
