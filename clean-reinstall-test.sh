#!/bin/bash
# Full clean and reinstall script for Playwright+Cucumber+TypeScript project

set -e

echo "[1/6] Removing node_modules and lock file..."
rm -rf node_modules package-lock.json

echo "[2/6] Removing compiled JS, maps, and build artifacts..."
find . -name '*.js' ! -path './node_modules/*' -delete
find . -name '*.js.map' ! -path './node_modules/*' -delete
find . -name '*.d.ts' ! -path './node_modules/*' -delete
rm -rf dist build out

echo "[3/6] Removing TypeScript build info and cache files..."
find . -name '*.tsbuildinfo' -delete

echo "[4/6] Reinstalling dependencies..."
npm install

echo "[5/6] (Optional) Rebuilding TypeScript (skip if using ts-node)..."
# Uncomment the next line if you pre-compile TypeScript
# npx tsc --build

echo "[6/6] Running Cucumber tests with ts-node..."
APP=demoqa npx cucumber-js --require-module ts-node/register --require tests/steps/generic.steps.ts --tags @demoqa tests/features/demoqa-all-features.feature

echo "[DONE] Clean, reinstall, and test run complete."
