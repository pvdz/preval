# Preval test case

# pattern_sequence_simple_tdz.md

> Normalize > Binding > Case-block > Pattern sequence simple tdz
>
> Assignments of all kinds should be normalized in all circumstances

TDZ case

#TODO

## Options

TDZ errors are not properly emulated so a n eval mismatch is expected

- skipEval

## Input

`````js filename=intro
let x = 1, y = 2, z = [10, 20, 30];
switch ($('a')) { case $('a'): let [x, y] = ($(x), $(y), z); break; }
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
      [x$1, y$1] = ($(x$1), $(y$1), z);
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
let x$1 = undefined;
let y$1 = undefined;
const tmpSwitchValue = $('a');
let tmpSwitchCaseToStart = 1;
const tmpBinLhs = $('a');
const tmpIfTest = tmpBinLhs === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
}
tmpSwitchBreak: {
  const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$1) {
    $(x$1);
    $(y$1);
    const arrAssignPatternRhs = z;
    const arrPatternSplat = [...arrAssignPatternRhs];
    x$1 = arrPatternSplat[0];
    y$1 = arrPatternSplat[1];
    break tmpSwitchBreak;
  } else {
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
} else {
}
tmpSwitchBreak: {
  const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$1) {
    $(undefined);
    $(undefined);
    const arrPatternSplat = [...z];
    arrPatternSplat[0];
    arrPatternSplat[1];
    break tmpSwitchBreak;
  } else {
  }
}
$(1, 2, z);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<skipped by option>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
