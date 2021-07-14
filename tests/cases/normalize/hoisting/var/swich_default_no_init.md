# Preval test case

# swich_default_no_init.md

> Normalize > Hoisting > Var > Swich default no init
>
> Vars can be declared in a switch case

#TODO

## Input

`````js filename=intro
switch ($(1)) {
  default:
    var x;
    break;
  case 1:
    x = 20;
    break;
}
$(x);
`````

## Pre Normal

`````js filename=intro
let x = undefined;
{
  const tmpSwitchValue = $(1);
  let tmpSwitchCaseToStart = 0;
  if (1 === tmpSwitchValue) tmpSwitchCaseToStart = 1;
  else;
  tmpSwitchBreak: {
    if (tmpSwitchCaseToStart <= 0) {
      undefined;
      break tmpSwitchBreak;
    }
    if (tmpSwitchCaseToStart <= 1) {
      x = 20;
      break tmpSwitchBreak;
    }
  }
}
$(x);
`````

## Normalized

`````js filename=intro
let x = undefined;
const tmpSwitchValue = $(1);
let tmpSwitchCaseToStart = 0;
const tmpIfTest = 1 === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 1;
} else {
}
tmpSwitchBreak: {
  const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$1) {
    break tmpSwitchBreak;
  } else {
    const tmpIfTest$3 = tmpSwitchCaseToStart <= 1;
    if (tmpIfTest$3) {
      x = 20;
      break tmpSwitchBreak;
    } else {
    }
  }
}
$(x);
`````

## Output

`````js filename=intro
let x = undefined;
const tmpSwitchValue = $(1);
let tmpSwitchCaseToStart = 0;
const tmpIfTest = 1 === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 1;
} else {
}
tmpSwitchBreak: {
  const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$1) {
    break tmpSwitchBreak;
  } else {
    x = 20;
    break tmpSwitchBreak;
  }
}
$(x);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 20
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
