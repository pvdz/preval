# Preval test case

# switch_func_hoisting_tdz.md

> Normalize > Hoisting > Func > Switch func hoisting tdz
>
> Func decl inside a switch block

#TODO

## Input

`````js filename=intro
f(); // This should fail
switch ($(1)) {
  case $(1):
    f();
    break;
  case $(2):
    function f() { $('pass'); }
}
`````

## Normalized

`````js filename=intro
f();
const tmpSwitchTest = $(1);
let f$1 = function () {
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
    f$1();
    break tmpSwitchBreak;
  } else {
    const tmpIfTest$3 = tmpSwitchCaseToStart <= 1;
  }
}
`````

## Output

`````js filename=intro
f();
const tmpSwitchTest = $(1);
const f$1 = function () {
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
    f$1();
    break tmpSwitchBreak;
  } else {
    tmpSwitchCaseToStart <= 1;
  }
}
`````

## Globals

BAD@! Found 1 implicit global bindings:

f

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Normalized calls: Same

Final output calls: Same
