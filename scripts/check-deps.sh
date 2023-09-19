#!/usr/bin/env bash

# check dependencies
npx --no-install lerna exec \
  --concurrency 1 -- \
  npx --yes npm-check-updates
