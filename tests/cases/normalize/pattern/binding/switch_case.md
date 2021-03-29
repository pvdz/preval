# Preval test case

# switch_case.md

> Normalize > Pattern > Binding > Switch case
>
> Scope of a switch block is shared between all cases so bindings need to be hoisted above it

#TODO

## Input

`````js filename=intro
switch (0) {
  case 0:
    let [a, b] = [10, 20];
    $(a, b);
}
`````

## Pre Normal

`````js filename=intro
{
  let a;
  let b;
  const tmpSwitchValue = 0;
  let tmpSwitchCaseToStart = 1;
  if (0 === tmpSwitchValue) tmpSwitchCaseToStart = 0;
  else;
  tmpSwitchBreak: {
    if (tmpSwitchCaseToStart <= 0) {
      [a, b] = [10, 20];
      $(a, b);
    }
  }
}
`````

## Normalized

`````js filename=intro
let a;
let b;
const tmpSwitchValue = 0;
let tmpSwitchCaseToStart = 1;
const tmpIfTest = 0 === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
}
const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
if (tmpIfTest$1) {
  const arrAssignPatternRhs = [10, 20];
  const arrPatternSplat = [...arrAssignPatternRhs];
  a = arrPatternSplat[0];
  b = arrPatternSplat[1];
  $(a, b);
}
`````

## Output

`````js filename=intro
const arrAssignPatternRhs = [10, 20];
const arrPatternSplat = [...arrAssignPatternRhs];
const tmpSSA_a = arrPatternSplat[0];
const tmpSSA_b = arrPatternSplat[1];
$(tmpSSA_a, tmpSSA_b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10, 20
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
