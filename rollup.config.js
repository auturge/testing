import typescript from "@wessberg/rollup-plugin-ts";
import tsConfigPaths from "rollup-plugin-ts-paths";
import packageJson from "./package.json";

function keysIfAny(array) {
    if (!array) {
        return [];
    }
    return Object.keys(array);
}

export default {
    watch: {
        clearScreen: false,
    },
    input: "src/index.ts",
    output: [
        {
            file: "./dist/" + packageJson.main,
            format: "cjs",
            sourcemap: true,
        },
        {
            file: "./dist/" + packageJson.module,
            format: "es",
            sourcemap: true,
        },
    ],
    // plugins: [tsConfigPaths(), typescript({ tsconfig: "tsconfig.json" })],
    plugins: [tsConfigPaths(), typescript()],
    external: [
        ...keysIfAny(packageJson.dependencies),
        ...keysIfAny(packageJson.devDependencies),
        ...keysIfAny(packageJson.peerDependencies),
    ],
};

// import ts from "@wessberg/rollup-plugin-ts";
// import tsConfigPaths from "rollup-plugin-ts-paths";
// import packageJson from "./package.json";

// function keysIfAny(array) {
//     if (!array) {
//         return [];
//     }
//     return Object.keys(array);
// }

// export default {
//     watch: {
//         clearScreen: false,
//     },
//     input: "src/index.ts",
//     output: [
//         {
//             file: "./dist/" + packageJson.main,
//             format: "cjs",
//             sourcemap: true,
//             // exports: "default",
//         },
//         {
//             file: "./dist/" + packageJson.module,
//             format: "esm",
//             sourcemap: true,
//         },
//     ],
//     plugins: [tsConfigPaths(), ts({ tsconfig: "tsconfig.json" })],
//     external: [
//         ...keysIfAny(packageJson.dependencies),
//         ...keysIfAny(packageJson.devDependencies),
//         ...keysIfAny(packageJson.peerDependencies),
//     ],
// };
