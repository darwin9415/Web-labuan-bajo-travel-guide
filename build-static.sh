#!/usr/bin/env sh
set -eu
rm -rf dist
mkdir -p dist
cp -- *.html *.css *.js *.json *.jpg *.webp *.txt dist/
