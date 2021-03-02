#!/bin/bash

# https://stackoverflow.com/questions/59895/how-to-get-the-source-directory-of-a-bash-script-from-within-the-script-itself
# https://stackoverflow.com/questions/7665/how-to-resolve-symbolic-links-in-a-shell-script
# Move to the folder where this script lives (should be `**/preval/tests/p.sh`)
cd "$( dirname $(realpath "${BASH_SOURCE[0]}") )" >/dev/null 2>&1
# Some recursive calls assume to be in project root. This makes it work when not called from there (like npm .bin/preval)
cd ..

# Can override this through `--node-bin path/here`
# I need to override this path when calling `./t p` through `sudo` for perf (`cset` & `chrt`), which mandate root.
NODE_BIN=$(which node) # This may exit non-zero. That's fine.

set -e # Exit on error

ACTION=''
ACTION_ARG=''
PARAM_NO_COLOR=''
PARAM_NORM=''
PARAM_FAST=''
PARAM_THREADS='1'
PARAM_LOG=''
PARAM_LOGTO=''
PARAM_MAXPASS=''
PARAM_MAXPASS_COUNT=''
PARAM_CLONELIMIT=''
PARAM_CLONELIMIT_COUNT=''

BOLD="\e[;1;1m";
BOLD_RED="\e[1;31m";
BOLD_GREEN="\e[1;32m";
DIM="\e[30;1m";
RED="\e[31m";
GREEN="\e[32m";
DIM_ORANGE="\e[0;31m"
NOCOLOR="\e[0m"

ARROW_UP='▲'
ARROW_DOWN='▼'

if [[ $# = 0 ]]; then
  ./t --help
  exit $!
fi

while [[ $# > 0 ]] ; do
  case "$1" in
    --help)
        echo "
Preval CLI Toolkit help:

 Shortcuts for common tools I use to work on Preval.
 Note that tests or anything depending on node_modules will not work on an npm checkout, that'd need a git clone.

 i <code>        Run test with custom input. Runs sloppy and sloppy webcompat by default. (stdin not supported)
 f <path>        Run target .md preval test file (the a/ b/ \"diff\" prefix is checked)
 F <path>        Run target file and consider its entire contents to be test input
 u               Run all test files and just write output
 U               Run all test files and force write output (ignores ASSERT failures)
 m               Run all tests and ask for update one-by-one
 fast            Omit many of the expression variation tests (ignores about 18k auto generated tests)

 --log           Automatically write normalization and result outputs to a log file after every pass
 --logto <path>  Folder to dump log files to. Implies --log.
 --max-pass <n>  Stop processing after n passes.
 --clone-limit n How often can a function be cloned before it's considered recursion?
 --node-bin=path Use this node binary to run stuff
 -C              Do not print colors
 -n              Only show normalized output
 -t <count>      Run tests in this many threads (default=1; no threads)
         "
      exit
      ;;

    i)
      # Custom input
      ACTION='-i'
      shift
      ACTION_ARG=$1
      ;;
    f)
      # Target specific md test file
      ACTION='-f'
      shift
      ACTION_ARG=$1

      # I frequently get file names from git diff, which prefixes the paths with a/ and b/ so this fixed that problem :)
      echo "Checking input file ${ACTION_ARG}"
      if [[ ! -f "${ACTION_ARG}" && ( "${ACTION_ARG}" == a/* || "${ACTION_ARG}" == b/* ) && -f "${ACTION_ARG:2}" ]]; then
        ACTION_ARG="${ACTION_ARG:2}"
        echo "Assuming the file name is prefixed with a/ or b/ from a git diff, slicing off the first two chars"
        echo "Will use input file: ${ACTION_ARG}"
      fi
      ;;
    F)
      # Use (entire) contents of given file as input
      ACTION='-F'
      shift
      ACTION_ARG=$1
      ;;
    u)
      # Update all test files with their current output (fast)
      ACTION='-u'
      ;;
    U)
      # Force update all test files with their current output
      ACTION='-u --force-write'
      ;;
    m)
      # Run all files and ask for any test case that needs updating (slower)
      ACTION='-q -U'
      ;;

    --log)
      PARAM_LOG='--log'
      ;;
    --logto)
      PARAM_LOG='--logto'
      shift
      PARAM_LOGTO=$1
      ;;
    --max-pass)
      PARAM_MAXPASS="--max-pass"
      shift
      PARAM_MAXPASS_COUNT=$1
      ;;
    --clone-limit)
      PARAM_CLONELIMIT="--clone-limit"
      shift
      PARAM_CLONELIMIT_COUNT=$1
      ;;
    --node-bin)
      shift
      NODE_BIN=$1
      echo "Using '${NODE_BIN}' as node binary"
      ;;
    -C)
      shift
      PARAM_NO_COLOR="-C"
      ;;
    -n)
      # Only show normalized output
      PARAM_NORM='-n'
      ;;
    -t)
      # Only show normalized output
      shift
      PARAM_THREADS="$1"
      ;;

    fast)
      # Skip a bunch of test variations
      PARAM_FAST='fast'
      ;;

    *)
      echo "p: Unsupported action or option... \`$1\` Use --help for options"
      exit 1
      ;;
  esac
  shift
done

# Confirm node version is 12+ because the `import`/`export` syntax was not supported before
if [[ "$("${NODE_BIN}" --version | sed 's/[^0-9]*\([0-9]\+\).*/\1/')" -lt "12" ]]; then
  echo "
Preval CLI Toolkit:

  Error: Using NodeJS version $(node --version)

  The Preval CLI toolkit requires NodeJS 12+ because it uses ESM (import/export) without Babel.

  You can supply a custom node binary through the arg (\`./p --node-bin ~/.nvm/versions/node/v12.14.1/bin/node i 'x'\`)
  "
  exit 1
fi

set -x

case "${ACTION}" in

    *)
      ${NODE_BIN} --max-old-space-size=8192 tests/index.mjs ${ACTION} "${ACTION_ARG}" "${PARAM_NO_COLOR}" "${PARAM_NORM}" "${PARAM_FAST}" -t "${PARAM_THREADS}" "${PARAM_LOG}" "${PARAM_LOGTO}" "${PARAM_MAXPASS}" "${PARAM_MAXPASS_COUNT}" "${PARAM_CLONELIMIT}" "${PARAM_CLONELIMIT_COUNT}"
    ;;
esac
set +x

if [[ ! -z "${NODE_PROF}" ]]; then
  echo "generating flamechart now"
  if [[ -f v8.log ]]; then
    npx pflames v8.log
    rm v8.log
  fi
fi

if [[ "${HF}" = "yes" ]]; then
    echo '###### END OF PARSER #####'
fi
