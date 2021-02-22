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

## Normalized

`````js filename=intro
const tmpSwitchTest = $(1);
let x;
var f = function () {
  const tmpReturnArg = $(x, 'x');
  return tmpReturnArg;
};
const tmpSwitchValue = tmpSwitchTest;
let tmpSwitchCaseToStart = 2;
const tmpIfTest = 0 === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
  const tmpIfTest$1 = 1 === tmpSwitchValue;
  if (tmpIfTest$1) {
    tmpSwitchCaseToStart = 1;
  }
}
tmpSwitchBreak: {
  const tmpIfTest$2 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$2) {
    break tmpSwitchBreak;
  }
  const tmpIfTest$3 = tmpSwitchCaseToStart <= 1;
  if (tmpIfTest$3) {
    x = 100;
    f();
    break tmpSwitchBreak;
  }
}
`````

## Output

`````js filename=intro
const tmpSwitchTest = $(1);
let x;
const f = function () {
  const tmpReturnArg = $(x, 'x');
  return tmpReturnArg;
};
let tmpSwitchCaseToStart = 2;
const tmpIfTest = 0 === tmpSwitchTest;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
  const tmpIfTest$1 = 1 === tmpSwitchTest;
  if (tmpIfTest$1) {
    tmpSwitchCaseToStart = 1;
  }
}
tmpSwitchBreak: {
  const tmpIfTest$2 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$2) {
    break tmpSwitchBreak;
  }
  const tmpIfTest$3 = tmpSwitchCaseToStart <= 1;
  if (tmpIfTest$3) {
    x = 100;
    f();
    break tmpSwitchBreak;
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

Normalized calls: Same

Final output calls: Same