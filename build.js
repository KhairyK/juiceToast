import esbuild from "esbuild";

/* ===== ESM ===== */
await esbuild.build({
  entryPoints: ["src/juice-toast.esm.src.js"],
  outfile: "dist/juice-toast.esm.js",
  format: "esm",
  sourcemap: true,
  minify: true,
  target: ["es2018"],
});

/* ===== UMD ===== */
await esbuild.build({
  entryPoints: ["src/juice-toast.umd.src.js"],
  outfile: "dist/juice-toast.umd.js",
  format: "iife",
  globalName: "juiceToast",
  sourcemap: true,
  minify: true,
  target: ["es2018"],
});
