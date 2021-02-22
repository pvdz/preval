# Preval test case

# switch_func_hoisting_no_tdz.md

> Normalize > Hoisting > Func > Switch func hoisting no tdz
>
> Func decl inside a switch block

#TODO

## Input

`````js filename=intro
switch ($(1)) {
  case $(1):
    f();
    break;
  case $(2):
    function f() { $('pass'); }
}
f(); // This should work
`````

## Normalized

`````js filename=intro
const tmpSwitchTest = $(1);
var f = function () {
  $('pass');
};
const tmpSwitchValue = tmpSwitchTest;
let tmpSwitchCaseToStart = 2;
const tmpBinLhs = $(1);
const tmpIfTest = tmpBinLhs === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
  const tmpBinLhs$1 = $(2);
  const tmpIfTest$1 = tmpBinLhs$1 === tmpSwitchValue;
  if (tmpIfTest$1) {
    tmpSwitchCaseToStart = 1;
  }
}
tmpSwitchBreak: {
  const tmpIfTest$2 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$2) {
    f();
    break tmpSwitchBreak;
  }
  const tmpIfTest$3 = tmpSwitchCaseToStart <= 1;
}
f$1();
`````

## Output

`````js filename=intro
const tmpSwitchTest = $(1);
const f = function () {
  $('pass');
};
let tmpSwitchCaseToStart = 2;
const tmpBinLhs = $(1);
const tmpIfTest = tmpBinLhs === tmpSwitchTest;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
  const tmpBinLhs$1 = $(2);
  const tmpIfTest$1 = tmpBinLhs$1 === tmpSwitchTest;
  if (tmpIfTest$1) {
    tmpSwitchCaseToStart = 1;
  }
}
tmpSwitchBreak: {
  const tmpIfTest$2 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$2) {
    f();
    break tmpSwitchBreak;
  }
  tmpSwitchCaseToStart <= 1;
}
f$1();
`````

## Globals

BAD@! Found 1 implicit global bindings:

f$1

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 'pass'
 - eval returned: ('<crash[ <ref> is not defined ]>')

Normalized calls: Same

Final output calls: Same