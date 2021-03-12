# Preval test case

# swich_case_init.md

> Normalize > Hoisting > Var > Swich case init
>
> Vars can be declared in a switch case

#TODO

## Input

`````js filename=intro
switch ($(1)) {
  case 0:
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
const tmpSwitchTest = $(1);
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
    x = 10;
    break tmpSwitchBreak;
  } else {
    const tmpIfTest$3 = tmpSwitchCaseToStart <= 1;
    if (tmpIfTest$3) {
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
const tmpSwitchTest = $(1);
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
    x = 10;
    break tmpSwitchBreak;
  } else {
    const tmpIfTest$3 = tmpSwitchCaseToStart <= 1;
    if (tmpIfTest$3) {
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
