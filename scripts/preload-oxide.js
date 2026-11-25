// Preloaded into every Node process via NODE_OPTIONS="--require ...".
// Loads @tailwindcss/oxide BEFORE Turbopack's runtime/heavy patching kicks in,
// so the native binding resolves + caches cleanly. Later requires become
// cache hits and never re-run the broken resolution path.
try {
  require("@tailwindcss/oxide");
} catch (e) {
  // Never break the host process — fall through to normal behavior.
}
