# NPM

The only way to update npm is to release a new version, even if you’re just fixing a typo. npm will not allow you to re-publish to the same number.

So let’s create a new release by bumping the version in your package.json. To do that, you can edit the file manually or use

    npm version <update_type> -m "<message>"

where update_type is one of the semantic versioning release types:

_patch_, _minor_, or _major_.

So let’s do

    npm version patch -m "Version %s - add sweet badges"

%s = the new version number.

This command will bump the version number in package.json, add a new commit, and tag it with this release number.

Note: Your Git working directory has to be clean before you can run npm version.

After bumping the version number,

    git push && git push --tags (or git push origin master --tags)
    npm publish

Now if you go to your published module on npm, you should see your new release with the two sweet badges!

Taken from:
<https://codeburst.io/how-to-create-and-publish-your-first-node-js-module-444e7585b738#.ezvdn3d5t>
