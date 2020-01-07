#!/bin/sh
yarn f:build

mv ./dist/index.esm.js ./dist/index.js
