import esbuild from "rollup-plugin-esbuild";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import dts from "rollup-plugin-dts";

const external = ["dompurify"];

const banner = `/*!
 * JuiceToast v2.0.0 (Pack 0)
 * 2026 (C) OpenDN Foundation
 * See CONTRIBUTING.md to contribute
 */`;

export default [
  // ================= JS BUILD =================
  {
    input: "src/index.js",
    external,
    output: [
      {
        file: "dist/juice-toast.esm.js",
        format: "esm",
        sourcemap: true,
        banner
      },
      {
        file: "dist/juice-toast.umd.js",
        format: "umd",
        name: "juiceToast",
        sourcemap: true,
        banner,
        globals: {
          dompurify: "DOMPurify"
        }
      }
    ],
    plugins: [
      nodeResolve(),
      commonjs(),
      esbuild({
        target: "es2018",
        minify: true
      })
    ]
  },

  // ================= TYPES BUILD =================
  {
    input: "src/index.js",
    output: {
      file: "dist/juice-toast.d.ts",
      format: "es"
    },
    plugins: [dts()]
  }
];
