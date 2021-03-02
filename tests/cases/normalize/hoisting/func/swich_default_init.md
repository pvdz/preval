# Preval test case

# swich_default_init.md

> Normalize > Hoisting > Func > Swich default init
>
> Vars can be declared in a switch case

#TODO

## Input

`````js filename=intro
switch ($(1)) {
  default:
    function f() { return $('f'); }
    break;
  case 1:
    f();
    break;
}
`````

## Normalized

`````js filename=intro
const tmpSwitchTest = $(1);
let f = function () {
  const tmpReturnArg = $('f');
  return tmpReturnArg;
};
const tmpSwitchValue = tmpSwitchTest;
let tmpSwitchCaseToStart = 0;
const tmpIfTest = 1 === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 1;
}
tmpSwitchBreak: {
  const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$1) {
    break tmpSwitchBreak;
  } else {
    const tmpIfTest$2 = tmpSwitchCaseToStart <= 1;
    if (tmpIfTest$2) {
      f();
      break tmpSwitchBreak;
    }
  }
}
`````

## Output

`````js filename=intro
const tmpSwitchTest = $(1);
const f = function () {
  const tmpReturnArg = $('f');
  return tmpReturnArg;
};
let tmpSwitchCaseToStart = 0;
const tmpIfTest = 1 === tmpSwitchTest;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 1;
}
tmpSwitchBreak: {
  const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$1) {
    break tmpSwitchBreak;
  } else {
    const tmpIfTest$2 = tmpSwitchCaseToStart <= 1;
    if (tmpIfTest$2) {
      f();
      break tmpSwitchBreak;
    }
  }
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 'f'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
