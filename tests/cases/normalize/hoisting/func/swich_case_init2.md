# Preval test case

# swich_case_init2.md

> Normalize > Hoisting > Func > Swich case init2
>
> Vars can be declared in a switch case

#TODO

## Input

`````js filename=intro
switch ($(1)) {
  case 0:
    function f() { return $(x, 'x'); }
    break;
  case 1:
    const x = 100; // The func still needs access to this binding... very unusual...
    f();
    break;
}
`````

## Pre Normal

`````js filename=intro
{
  let x;
  let f = function () {
    debugger;
    return $(x, 'x');
  };
  const tmpSwitchValue = $(1);
  let tmpSwitchCaseToStart = 2;
  if (0 === tmpSwitchValue) tmpSwitchCaseToStart = 0;
  else if (1 === tmpSwitchValue) tmpSwitchCaseToStart = 1;
  else;
  tmpSwitchBreak: {
    if (tmpSwitchCaseToStart <= 0) {
      break tmpSwitchBreak;
    }
    if (tmpSwitchCaseToStart <= 1) {
      x = 100;
      f();
      break tmpSwitchBreak;
    }
  }
}
`````

## Normalized

`````js filename=intro
let x = undefined;
let f = function () {
  debugger;
  const tmpReturnArg = $(x, 'x');
  return tmpReturnArg;
};
const tmpSwitchValue = $(1);
let tmpSwitchCaseToStart = 2;
const tmpIfTest = 0 === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
  const tmpIfTest$1 = 1 === tmpSwitchValue;
  if (tmpIfTest$1) {
    tmpSwitchCaseToStart = 1;
  } else {
  }
}
tmpSwitchBreak: {
  const tmpIfTest$3 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$3) {
    break tmpSwitchBreak;
  } else {
  }
  const tmpIfTest$5 = tmpSwitchCaseToStart <= 1;
  if (tmpIfTest$5) {
    x = 100;
    f();
    break tmpSwitchBreak;
  } else {
  }
}
`````

## Output

`````js filename=intro
const tmpSwitchValue = $(1);
let tmpSwitchCaseToStart = 2;
const tmpIfTest = 0 === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
  const tmpIfTest$1 = 1 === tmpSwitchValue;
  if (tmpIfTest$1) {
    tmpSwitchCaseToStart = 1;
  } else {
  }
}
tmpSwitchBreak: {
  const tmpIfTest$3 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$3) {
    break tmpSwitchBreak;
  } else {
  }
  const tmpIfTest$5 = tmpSwitchCaseToStart <= 1;
  if (tmpIfTest$5) {
    $(100, 'x');
    break tmpSwitchBreak;
  } else {
  }
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 100, 'x'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
