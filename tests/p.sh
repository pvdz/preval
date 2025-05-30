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
PARAM_LOG_FROM=''
PARAM_LOG_FROM_N=''
PARAM_MAXPASS=''
PARAM_MAXPASS_COUNT=''
PARAM_CLONELIMIT=''
PARAM_CLONELIMIT_COUNT=''
PARAM_TRIM_DOLLAR=''
PARAM_ONLY_OUTPUT=''
PARAM_TRACE=''
PARAM_NO_TRACE=''
PARAM_SILENT=''
PARAM_SKIP_EVAL=''
PARAM_UNROLL=''
PARAM_UNROLL_VALUE=''
PARAM_IMPTHIS=''
PARAM_IMPTHIS_VALUE=''
PARAM_RANDOMIZED=''
PARAM_REFTEST=''
PARAM_REF_TRACING=''
PARAM_RISKY=''
PARAM_PCODE=''
PARAM_SEED=''
PARAM_SEED_N=''
PARAM_TIME=''

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
 A <path>        Alias for `rm -r out && mkdirp out && ./p F <path> --logto out --silent --time`
 fast            Omit many of the expression variation tests (ignores about 18k auto generated tests). Use -fast for the inverse.

 --log           Automatically write code after every phase executed to a log file. Defaults to .
 --logto <path>  Folder to dump log files to. Implies --log. Defaults to .
 --log-passes    Log per pass instead of after every individual phase. Less noisy.
 --log-from      Only write log files from this pass onward
 --max-pass <n>  Stop processing after n passes.
 --clone-limit n How often can a function be cloned before it's considered recursion?
 --node-bin=path Use this node binary to run stuff
 --trim          Remove the trailing \$123 tail from vars in test outputs (helps with diffing, do not commit)
 --oo            Only print the output section of the test case (helps with diffing, do not commit)
 --trace         Force print tracing output
 --no-trace      Force not printing tracing output
 --silent        Suppress most output while running
 --skip-eval     Do not eval the result to compare runtime differences
 --unroll n      User a different cap on the number of times a loop can be unrolled. Higher increases code bloat.
 --implicit-this x User defined ident to replace \`this\` when the function is never called with a context. Defaults to \`undefined\`.
 --randomized    Shuffle the test order. All tests will be visited but in .sort(Math.random) order.
 --refTest       Special mode to test ref tracking. Output will be different, dumping ref tracking state after first phase1 pass.
 --ref-tracing   Print ref tracking trace logs
 --ref           Alias for --no-trace --ref-tracing :shrug:
 --risky         Enable risky rules. These rules cut a few corners but should be okay in most scenarios. Enabled by default.
 --no-risky      Disable risky rules. These rules cut a few corners but should be okay in most scenarios. Enabled by default.
 --pcode         Consider input a pcode test
 --seed n        Set the rng seed to inline certain Math.random cases. If zero then math.random is never inlined. Default: 1
 --time          Track and print some rudimentary timing data for phases 1, 1.1, and 2.
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
      PARAM_TIME='--time'
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
    A)
      # Force update all test files with their current output
      rm -rf out
      mkdir out
      ACTION='-F'
      shift
      ACTION_ARG=$1
      PARAM_LOG='--logto'
      PARAM_LOGTO='out'
      PARAM_SILENT='--silent'
      PARAM_TIME='--time'
      ;;

    --log)
      PARAM_LOG='--log'
      ;;
    --logdir) # secret alias
      PARAM_LOG='--logto'
      shift
      PARAM_LOGTO=$1
      ;;
    --logto)
      PARAM_LOG='--logto'
      shift
      PARAM_LOGTO=$1
      ;;
    --log-passes)
      PARAM_LOG='--log-passes'
      ;;
    --log-from)
      PARAM_LOG_FROM='--log-from'
      shift
      PARAM_LOG_FROM_N=$1
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
    --trim)
      PARAM_TRIM_DOLLAR='--trim-dollar'
      ;;
    --oo)
      PARAM_ONLY_OUTPUT='--only-output'
      ;;
    --trace)
      PARAM_TRACE='--trace'
      ;;
    --no-trace)
      PARAM_NO_TRACE='--no-trace'
      ;;
    --silent)
      PARAM_SILENT='--silent'
      ;;
    --skip-eval)
      PARAM_SKIP_EVAL='--skip-eval'
      ;;
    --unroll)
      PARAM_UNROLL='--unroll'
      shift
      PARAM_UNROLL_VALUE=$1
      ;;
    --implicit-this)
      PARAM_IMPTHIS='--implicit-this'
      shift
      PARAM_IMPTHIS_VALUE=$1
      ;;
    --randomized)
      PARAM_RANDOMIZED='--randomized'
      ;;
    --refTest)
      PARAM_REFTEST='--refTest'
      ;;
    --pcode)
      PARAM_PCODE='--pcode'
      ;;
    --ref-tracing)
      PARAM_REF_TRACING='--refTracing'
      ;;
    --ref)
      PARAM_NO_TRACE='--no-trace'
      PARAM_REF_TRACING='--refTracing'
      ;;
    --risky)
      PARAM_RISKY='--risky'
      ;;
    --no-risky)
      PARAM_RISKY='--no-risky'
      ;;
    --seed)
      PARAM_SEED='--seed'
      shift
      PARAM_SEED_N=$1
      ;;
    --time)
      PARAM_TIME='--time'
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

    -fast)
      # Only run the tests that would be skipped with the "fast" option
      PARAM_FAST='-fast'
      ;;

    *)
      echo "p: Unsupported action or option... (dont use \`=\` between option name and arg); \`$1\` Use --help for options"
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
      ${NODE_BIN} --max-old-space-size=32768 tests/index.mjs ${ACTION} "${ACTION_ARG}" "${PARAM_NO_COLOR}" "${PARAM_NORM}" "${PARAM_FAST}" -t "${PARAM_THREADS}" "${PARAM_LOG}" "${PARAM_LOGTO}" "${PARAM_LOG_FROM}" "${PARAM_LOG_FROM_N}" "${PARAM_MAXPASS}" "${PARAM_MAXPASS_COUNT}" "${PARAM_CLONELIMIT}" "${PARAM_CLONELIMIT_COUNT}" "${PARAM_TRIM_DOLLAR}" "${PARAM_ONLY_OUTPUT}" "${PARAM_TRACE}" "${PARAM_NO_TRACE}" "${PARAM_SILENT}" "${PARAM_SKIP_EVAL}" "${PARAM_UNROLL}" "${PARAM_UNROLL_VALUE}" "${PARAM_IMPTHIS}" "${PARAM_IMPTHIS_VALUE}" "${PARAM_RANDOMIZED}" "${PARAM_REFTEST}" "${PARAM_REF_TRACING}" "${PARAM_RISKY}" "${PARAM_PCODE}" "${PARAM_SEED}" "${PARAM_SEED_N}" "${PARAM_TIME}"
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
