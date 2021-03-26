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

## Pre Normal

`````js filename=intro
f();
{
  let f$1 = function () {
    debugger;
    $('pass');
  };
  const tmpSwitchValue = $(1);
  let tmpSwitchCaseToStart = 2;
  if ($(1) === tmpSwitchValue) tmpSwitchCaseToStart = 0;
  else if ($(2) === tmpSwitchValue) tmpSwitchCaseToStart = 1;
  else;
  tmpSwitchBreak: {
    if (tmpSwitchCaseToStart <= 0) {
      f$1();
      break tmpSwitchBreak;
    }
    if (tmpSwitchCaseToStart <= 1) {
    }
  }
}
`````

## Normalized

`````js filename=intro
f();
let f$1 = function () {
  debugger;
  $('pass');
};
const tmpSwitchValue = $(1);
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
  const tmpIfTest$3 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$3) {
    f$1();
    break tmpSwitchBreak;
  } else {
    const tmpIfTest$5 = tmpSwitchCaseToStart <= 1;
  }
}
`````

## Output

`````js filename=intro
f();
const tmpSwitchValue = $(1);
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
  const tmpIfTest$3 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$3) {
    $('pass');
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

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
