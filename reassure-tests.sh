#!/usr/bin/env bash
set -e

BASELINE_BRANCH=${BASELINE_BRANCH:="main"}

# Required for `git switch` on CI
git fetch origin

# Gather baseline perf measurements
git switch "$BASELINE_BRANCH"
npm ci
TEST_RUNNER_ARG="--silent" npm run reassure -- --baseline

# Gather current perf measurements & compare results
git switch --detach -
npm ci
TEST_RUNNER_ARG="--silent" npm run reassure
