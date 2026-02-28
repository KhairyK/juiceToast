import esbuild from "rollup-plugin-esbuild";

export default {
  input: "src/juice-toast.esm.src.js",

  output: [
    {
      file: "dist/juice-toast.esm.js",
      format: "esm",
      sourcemap: true
    },
    {
      file: "dist/juice-toast.umd.js",
      format: "umd",
      name: "juiceToast",
      sourcemap: true
    }
  ],

  plugins: [
    esbuild({
      target: "es2017",
      minify: true
    })
  ]
};