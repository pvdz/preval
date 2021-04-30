# Preval test case

# switch_func_hoisting2.md

> Normalize > Hoisting > Func > Switch func hoisting2
>
> Func decl inside a switch block

#TODO

## Input

`````js filename=intro
switch ($(2)) {
  case $(1):
    f();
    break;
  case $(2):
    f();
    function f() { $('pass'); }
    f();
}
`````

## Pre Normal

`````js filename=intro
{
  let f = function () {
    debugger;
    $('pass');
  };
  const tmpSwitchValue = $(2);
  let tmpSwitchCaseToStart = 2;
  if ($(1) === tmpSwitchValue) tmpSwitchCaseToStart = 0;
  else if ($(2) === tmpSwitchValue) tmpSwitchCaseToStart = 1;
  else;
  tmpSwitchBreak: {
    if (tmpSwitchCaseToStart <= 0) {
      f();
      break tmpSwitchBreak;
    }
    if (tmpSwitchCaseToStart <= 1) {
      f();
      f();
    }
  }
}
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  $('pass');
  return undefined;
};
const tmpSwitchValue = $(2);
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
  } else {
  }
}
tmpSwitchBreak: {
  const tmpIfTest$3 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$3) {
    f();
    break tmpSwitchBreak;
  } else {
  }
  const tmpIfTest$5 = tmpSwitchCaseToStart <= 1;
  if (tmpIfTest$5) {
    f();
    f();
  } else {
  }
}
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  $('pass');
  return undefined;
};
const tmpSwitchValue = $(2);
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
  } else {
  }
}
tmpSwitchBreak: {
  const tmpIfTest$3 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$3) {
    f();
    break tmpSwitchBreak;
  } else {
  }
  const tmpIfTest$5 = tmpSwitchCaseToStart <= 1;
  if (tmpIfTest$5) {
    f();
    f();
  } else {
  }
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: 1
 - 3: 2
 - 4: 'pass'
 - 5: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
