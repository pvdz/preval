# Preval test case

# swich_default_init.md

> Normalize > Hoisting > Var > Swich default init
>
> Vars can be declared in a switch case

#TODO

## Input

`````js filename=intro
switch ($(1)) {
  default:
    var x = 10;
    break;
  case 1:
    x = 20;
    break;
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
}
tmpSwitchBreak: {
  const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$1) {
    x = 10;
    break tmpSwitchBreak;
  } else {
    const tmpIfTest$2 = tmpSwitchCaseToStart <= 1;
    if (tmpIfTest$2) {
      x = 20;
      break tmpSwitchBreak;
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
}
tmpSwitchBreak: {
  const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$1) {
    x = 10;
    break tmpSwitchBreak;
  } else {
    const tmpIfTest$2 = tmpSwitchCaseToStart <= 1;
    if (tmpIfTest$2) {
      x = 20;
      break tmpSwitchBreak;
    }
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

Normalized calls: Same

Final output calls: Same
