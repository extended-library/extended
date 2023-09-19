#!/usr/bin/env bash

# explicitly enable globstar to match **
shopt -s globstar

rm -rf node_modules
rm -rf package-lock*

rm -rf packages/*/dist*
rm -rf packages/*/node_modules
rm -rf packages/*/package-lock*
