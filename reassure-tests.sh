#!/usr/bin/env bash
set -e

BASELINE_BRANCH=${BASELINE_BRANCH:="main"}

# Required for `git switch` on CI
git fetch origin

# Gather baseline perf measurements
git switch "$BASELINE_BRANCH"
yarn install --frozen-lockfile
TEST_RUNNER_ARG="--silent" yarn reassure --baseline

# Gather current perf measurements & compare results
git switch --detach -
yarn install --frozen-lockfile
TEST_RUNNER_ARG="--silent" yarn reassure
