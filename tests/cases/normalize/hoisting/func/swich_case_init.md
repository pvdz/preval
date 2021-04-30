# Preval test case

# swich_case_init.md

> Normalize > Hoisting > Func > Swich case init
>
> Vars can be declared in a switch case

#TODO

## Input

`````js filename=intro
switch ($(1)) {
  case 0:
    function f() { return $('f'); }
    break;
  case 1:
    f();
    break;
}
`````

## Pre Normal

`````js filename=intro
{
  let f = function () {
    debugger;
    return $('f');
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
      f();
      break tmpSwitchBreak;
    }
  }
}
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  const tmpReturnArg = $('f');
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
    $('f');
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
 - 2: 'f'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
