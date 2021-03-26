# Preval test case

# switch_case_rereferenced_tdz.md

> Normalize > Pattern > Binding > Switch case rereferenced tdz
>
> Scope of a switch block is shared between all cases so bindings need to be hoisted above it

However, the TDZ is still active so this should be an error. 

#TODO

## Options

TDZ errors are not properly emulated so a n eval mismatch is expected

- skipEval

## Input

`````js filename=intro
switch (1) {
  case 0:
    let [a, b] = [10, 20];
  case 1:
    [a, b] = [30, 40];
}
`````

## Pre Normal

`````js filename=intro
{
  let a;
  let b;
  const tmpSwitchValue = 1;
  let tmpSwitchCaseToStart = 2;
  if (0 === tmpSwitchValue) tmpSwitchCaseToStart = 0;
  else if (1 === tmpSwitchValue) tmpSwitchCaseToStart = 1;
  else;
  tmpSwitchBreak: {
    if (tmpSwitchCaseToStart <= 0) {
      [a, b] = [10, 20];
    }
    if (tmpSwitchCaseToStart <= 1) {
      [a, b] = [30, 40];
    }
  }
}
`````

## Normalized

`````js filename=intro
let a;
let b;
const tmpSwitchValue = 1;
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
const tmpIfTest$3 = tmpSwitchCaseToStart <= 0;
if (tmpIfTest$3) {
  const arrAssignPatternRhs = [10, 20];
  const arrPatternSplat = [...arrAssignPatternRhs];
  a = arrPatternSplat[0];
  b = arrPatternSplat[1];
}
const tmpIfTest$5 = tmpSwitchCaseToStart <= 1;
if (tmpIfTest$5) {
  const arrAssignPatternRhs$1 = [30, 40];
  const arrPatternSplat$1 = [...arrAssignPatternRhs$1];
  a = arrPatternSplat$1[0];
  b = arrPatternSplat$1[1];
}
`````

## Output

`````js filename=intro
const arrAssignPatternRhs$1 = [30, 40];
const arrPatternSplat$1 = [...arrAssignPatternRhs$1];
arrPatternSplat$1[0];
arrPatternSplat$1[1];
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<skipped by option>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
