# Preval test case

# switch.md

> Normalize > Blocks > Switch
>
> Add blocks to sub-statements. Let's do this for cases as well, for now. Maybe that's a mistake :)

#TODO

## Input

`````js filename=intro
switch ($(1)) {
  case $(2): $(3);
  case $(4):
  case $(5):
  case $(6): break;
  case $(7):
  default:
}
`````

## Normalized

`````js filename=intro
const tmpSwitchTest = $(1);
const tmpSwitchValue = tmpSwitchTest;
let tmpSwitchCaseToStart = 5;
const tmpBinLhs = $(2);
const tmpIfTest = tmpBinLhs === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
  const tmpBinLhs$1 = $(4);
  const tmpIfTest$1 = tmpBinLhs$1 === tmpSwitchValue;
  if (tmpIfTest$1) {
    tmpSwitchCaseToStart = 1;
  } else {
    const tmpBinLhs$2 = $(5);
    const tmpIfTest$2 = tmpBinLhs$2 === tmpSwitchValue;
    if (tmpIfTest$2) {
      tmpSwitchCaseToStart = 2;
    } else {
      const tmpBinLhs$3 = $(6);
      const tmpIfTest$3 = tmpBinLhs$3 === tmpSwitchValue;
      if (tmpIfTest$3) {
        tmpSwitchCaseToStart = 3;
      } else {
        const tmpBinLhs$4 = $(7);
        const tmpIfTest$4 = tmpBinLhs$4 === tmpSwitchValue;
        if (tmpIfTest$4) {
          tmpSwitchCaseToStart = 4;
        }
      }
    }
  }
}
tmpSwitchBreak: {
  const tmpIfTest$5 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$5) {
    $(3);
  }
  const tmpIfTest$6 = tmpSwitchCaseToStart <= 1;
  const tmpIfTest$7 = tmpSwitchCaseToStart <= 2;
  const tmpIfTest$8 = tmpSwitchCaseToStart <= 3;
  if (tmpIfTest$8) {
    break tmpSwitchBreak;
  }
  const tmpIfTest$9 = tmpSwitchCaseToStart <= 4;
  const tmpIfTest$10 = tmpSwitchCaseToStart <= 5;
}
`````

## Output

`````js filename=intro
const tmpSwitchTest = $(1);
let tmpSwitchCaseToStart = 5;
const tmpBinLhs = $(2);
const tmpIfTest = tmpBinLhs === tmpSwitchTest;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
  const tmpBinLhs$1 = $(4);
  const tmpIfTest$1 = tmpBinLhs$1 === tmpSwitchTest;
  if (tmpIfTest$1) {
    tmpSwitchCaseToStart = 1;
  } else {
    const tmpBinLhs$2 = $(5);
    const tmpIfTest$2 = tmpBinLhs$2 === tmpSwitchTest;
    if (tmpIfTest$2) {
      tmpSwitchCaseToStart = 2;
    } else {
      const tmpBinLhs$3 = $(6);
      const tmpIfTest$3 = tmpBinLhs$3 === tmpSwitchTest;
      if (tmpIfTest$3) {
        tmpSwitchCaseToStart = 3;
      } else {
        const tmpBinLhs$4 = $(7);
        const tmpIfTest$4 = tmpBinLhs$4 === tmpSwitchTest;
        if (tmpIfTest$4) {
          tmpSwitchCaseToStart = 4;
        }
      }
    }
  }
}
tmpSwitchBreak: {
  const tmpIfTest$5 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$5) {
    $(3);
  }
  tmpSwitchCaseToStart <= 1;
  tmpSwitchCaseToStart <= 2;
  const tmpIfTest$8 = tmpSwitchCaseToStart <= 3;
  if (tmpIfTest$8) {
    break tmpSwitchBreak;
  }
  tmpSwitchCaseToStart <= 4;
  tmpSwitchCaseToStart <= 5;
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 4
 - 4: 5
 - 5: 6
 - 6: 7
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
