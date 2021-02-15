# Preval test case

# swtich_case_init.md

> normalize > hoisting > func > swtich_case_init
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

## Normalized

`````js filename=intro
function f() {
  const tmpReturnArg = $('f');
  return tmpReturnArg;
}
const tmpSwitchTest = $(1);
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
    f();
    break tmpSwitchBreak;
  }
}
`````

## Output

`````js filename=intro
function f() {
  const tmpReturnArg = $('f');
  return tmpReturnArg;
}
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
    break tmpSwitchBreak;
  }
  const tmpIfTest$3 = tmpSwitchCaseToStart <= 1;
  if (tmpIfTest$3) {
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
 - 2: 'f'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
