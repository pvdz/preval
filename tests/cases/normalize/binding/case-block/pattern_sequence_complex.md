# Preval test case

# pattern_sequence_complex.md

> Normalize > Binding > Case-block > Pattern sequence complex
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let x = 1, y = 2, z = [10, 20, 30];
switch ($('a')) { case $('a'): let [x, y] = ($(1), $(2), $(z)); break; }
$(x, y, z);
`````

## Pre Normal

`````js filename=intro
let x = 1,
  y = 2,
  z = [10, 20, 30];
{
  let x$1;
  let y$1;
  const tmpSwitchValue = $('a');
  let tmpSwitchCaseToStart = 1;
  if ($('a') === tmpSwitchValue) tmpSwitchCaseToStart = 0;
  else;
  tmpSwitchBreak: {
    if (tmpSwitchCaseToStart <= 0) {
      [x$1, y$1] = ($(1), $(2), $(z));
      break tmpSwitchBreak;
    }
  }
}
$(x, y, z);
`````

## Normalized

`````js filename=intro
let x = 1;
let y = 2;
let z = [10, 20, 30];
let x$1;
let y$1;
const tmpSwitchValue = $('a');
let tmpSwitchCaseToStart = 1;
const tmpBinLhs = $('a');
const tmpIfTest = tmpBinLhs === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
}
tmpSwitchBreak: {
  const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$1) {
    $(1);
    $(2);
    const arrAssignPatternRhs = $(z);
    const arrPatternSplat = [...arrAssignPatternRhs];
    x$1 = arrPatternSplat[0];
    y$1 = arrPatternSplat[1];
    break tmpSwitchBreak;
  }
}
$(x, y, z);
`````

## Output

`````js filename=intro
const z = [10, 20, 30];
const tmpSwitchValue = $('a');
let tmpSwitchCaseToStart = 1;
const tmpBinLhs = $('a');
const tmpIfTest = tmpBinLhs === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
}
tmpSwitchBreak: {
  const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$1) {
    $(1);
    $(2);
    const arrAssignPatternRhs = $(z);
    const arrPatternSplat = [...arrAssignPatternRhs];
    arrPatternSplat[0];
    arrPatternSplat[1];
    break tmpSwitchBreak;
  }
}
$(1, 2, z);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'a'
 - 2: 'a'
 - 3: 1
 - 4: 2
 - 5: [10, 20, 30]
 - 6: 1, 2, [10, 20, 30]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
