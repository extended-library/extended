#!/usr/bin/env bash

# get the package scope as the first argument passed to the script
package_scope="$1"

# check if the package scope argument is empty
if [ -z "$package_scope" ]; then
  echo "Error: Package scope argument is missing."
  exit 1
fi

# run release
npx lerna exec --scope "$package_scope" -- \
  npm run prep

npx lerna exec --scope "$package_scope" -- \
  npx --no-install semantic-release -e semantic-release-monorepo
