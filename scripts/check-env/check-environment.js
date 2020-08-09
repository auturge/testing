/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
   !!! !!!
   !!!  This file is special in that it must be able to execute with wrong Node
   version  !!!
   !!!  or even when node_modules are missing. !!!
   !!! !!!
   !!!  Do not depend on Node4+ features or presence of npm packages here. !!!
   !!! !!!
   !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 */

"use strict";

let exec = require("child_process").exec;
let path = require("path");
let checkNodeModules;
let semver;
let issues = [];

let _logOutput = false;
let _purgeIfStale = false;

const PROJECT_ROOT = path.resolve(__dirname, "../..");
const packageFile = path.resolve(PROJECT_ROOT, "package.json");

try {
    semver = require("semver");
} catch (e) {
    issues.push("Looks like you are missing some npm dependencies. Run: `yarn install`");
}

if (issues.length) {
    printWarning(issues);
    console.error(
        "Your environment doesn't provide the prerequisite dependencies.\n" +
            "Please fix the issues listed above and then rerun the gulp command.\n" +
            "Check out https://github.com/auturge/auturge/blob/master/docs/DEVELOPER.md for more info."
    );
    process.exit(1);
}

// wrap in try/catch in case someone requires from within that file
try {
    checkNodeModules = require("./check-node-modules.js");
} catch (e) {
    issues.push("Looks like you are missing some npm dependencies. Run: `yarn install`");
    throw e;
} finally {
    // print warnings and move on, the next steps will likely fail, but hey, we
    // warned them.
    printWarning(issues);
}

if (require.main === module) {
    // we are running this script directly so just run checkEnvironment against
    // the root package.json

    let engines = require(packageFile).engines;
    if (!engines) {
        issues.push(
            "Looks like your package.json is missing the 'engines' declaration. Please add this."
        );
    }
    checkEnvironment(
        {
            requiredNodeVersion: engines.node,
            requiredNpmVersion: engines.npm,
            requiredYarnVersion: engines.yarn,
        },
        _logOutput,
        _purgeIfStale
    );
}

function checkEnvironment(reqs, logOutput, purgeIfStale) {
    exec("yarn --version", function (yarnErr, yarnStdout) {
        let foundNodeVersion = process.version;
        let foundYarnVersion = !yarnErr && semver.clean(yarnStdout);
        let issues = [];

        if (!semver.satisfies(foundNodeVersion, reqs.requiredNodeVersion)) {
            issues.push(
                "You are running unsupported node version. Found: " +
                    foundNodeVersion +
                    " Expected: " +
                    reqs.requiredNodeVersion +
                    ". Use nvm to update your node version."
            );
        }

        if (yarnErr) {
            issues.push(
                "You don't have yarn globally installed. This is required because we use yarn to " +
                    "ensure that we all use the exact same npm dependencies. Installation instructions: " +
                    "https://yarnpkg.com/lang/en/docs/install/"
            );
        } else if (!semver.satisfies(foundYarnVersion, reqs.requiredYarnVersion)) {
            issues.push(
                "You are running an unsupported yarn version. Found: " +
                    foundYarnVersion +
                    " Expected: " +
                    reqs.requiredYarnVersion +
                    ". This is required because we use yarn to " +
                    "ensure that we all use the exact same npm dependencies. Installation instructions: " +
                    "https://yarnpkg.com/lang/en/docs/install/"
            );
        }

        if (!checkNodeModules(PROJECT_ROOT, logOutput, purgeIfStale)) {
            issues.push(
                "Your node_modules directory is stale or out of sync with yarn.lock. Run: yarn install"
            );
        }

        printWarning(issues);
    });
}

function printWarning(issues) {
    if (!issues.length) return;

    console.warn("");
    console.warn("!".repeat(110));
    console.warn("!!!  Your environment is not in a good shape. Following issues were found:");
    issues.forEach(function (issue) {
        console.warn("!!!   - " + issue);
    });
    console.warn("!".repeat(110));
    console.warn("");

    if (process.env.CI) {
        process.exit(1);
    }
}

module.exports = checkEnvironment;
