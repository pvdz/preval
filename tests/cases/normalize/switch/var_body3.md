# Preval test case

# var_body3.md

> Normalize > Switch > Var body3
>
> Var as body of a do-while

#TODO

## Input

`````js filename=intro
switch ($(1)) {
  case $(1):
    var x;
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
    break tmpSwitchBreak;
  } else {
    const tmpIfTest$3 = tmpSwitchCaseToStart <= 1;
    if (tmpIfTest$3) {
      $(11);
    }
  }
}
$(x);
`````

## Output

`````js filename=intro
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
    break tmpSwitchBreak;
  } else {
    const tmpIfTest$3 = tmpSwitchCaseToStart <= 1;
    if (tmpIfTest$3) {
      $(11);
    }
  }
}
$(undefined);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
