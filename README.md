# Preval

A wannabe compiler tool for JS.

This project is intended to end up as some kind of compiler-esque tool for JS builds.

For the time being, it just replaces constant bindings with its constant value. Not very exciting. Possibly bugged.

# Usage

Run all tests and automatically update snapshots:

```
./p u
```

Test one specific file:

```
./p f tests/constants/copy.md
```

# Tests

The test cases are written to a markdown file which is interpreted in a paritcular way.

The test files contain the input and output of the test case, verbatim.

You can create a new test file by starting a line with a comment. The rest of the file is assumed to be the input code. Otherwise the test is assumed to adhere to the structure of existing tests.

# State

At the time of writing, the code base is really just a bootstrap, partially taken from Mope and Tenko, with some snapshotting setup for the test cases and some boiler plate for parsing and pre-processing the AST.

The phase 2 code is riddled with old unused stuff from Mope.

# Future

This is literally the setup for this project and a proof of concept-y gimmick. 
