# Preval test case

# auto_ident_c-opt_simple_simple.md

> normalize > expressions > assignments > switch_case_block > auto_ident_c-opt_simple_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1): {
    a = b?.["x"];
  }
}
$(a);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpSwitchTest = $(1);
const tmpSwitchValue = tmpSwitchTest;
let tmpSwitchCaseToStart = 1;
const tmpBinLhs = $(1);
const tmpIfTest = tmpBinLhs === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
}
const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
if (tmpIfTest$1) {
  a = undefined;
  const tmpChainRootProp = b;
  const tmpIfTest$2 = tmpChainRootProp != null;
  if (tmpIfTest$2) {
    const tmpChainRootComputed = 'x';
    const tmpChainElementObject = tmpChainRootProp[tmpChainRootComputed];
    a = tmpChainElementObject;
  }
}
$(a);
`````

## Output

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpSwitchTest = $(1);
let tmpSwitchCaseToStart = 1;
const tmpBinLhs = $(1);
const tmpIfTest = tmpBinLhs === tmpSwitchTest;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
}
const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
if (tmpIfTest$1) {
  a = undefined;
  const tmpIfTest$2 = b != null;
  if (tmpIfTest$2) {
    const tmpChainElementObject = b.x;
    a = tmpChainElementObject;
  }
}
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
