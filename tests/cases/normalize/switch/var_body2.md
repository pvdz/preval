# Preval test case

# var_body2.md

> Normalize > Switch > Var body2
>
> Var as body of a do-while

#TODO

## Input

`````js filename=intro
switch ($(1)) {
  case $(1):
    var x = 10;
    break;
  case $(2):
    $(11);
}
$(x);
`````

## Normalized

`````js filename=intro
let x = undefined;
const tmpSwitchTest = $(1);
const tmpSwitchValue = tmpSwitchTest;
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
  const tmpIfTest$2 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$2) {
    x = 10;
    break tmpSwitchBreak;
  }
  const tmpIfTest$3 = tmpSwitchCaseToStart <= 1;
  if (tmpIfTest$3) {
    $(11);
  }
}
$(x);
`````

## Output

`````js filename=intro
let x = undefined;
const tmpSwitchTest = $(1);
let tmpSwitchCaseToStart = 2;
const tmpBinLhs = $(1);
const tmpIfTest = tmpBinLhs === tmpSwitchTest;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
  const tmpBinLhs$1 = $(2);
  const tmpIfTest$1 = tmpBinLhs$1 === tmpSwitchTest;
  if (tmpIfTest$1) {
    tmpSwitchCaseToStart = 1;
  }
}
tmpSwitchBreak: {
  const tmpIfTest$2 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$2) {
    x = 10;
    break tmpSwitchBreak;
  }
  const tmpIfTest$3 = tmpSwitchCaseToStart <= 1;
  if (tmpIfTest$3) {
    $(11);
  }
}
$(x);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 10
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
