# Preval test case

# pattern_sequence_complex_tdz_crash.md

> Normalize > Binding > Case-block > Pattern sequence complex tdz crash
>
> Assignments of all kinds should be normalized in all circumstances

For now I guess we can't really support this TDZ case. We have to outline the binding.

Maybe in the future we can come up with a solution where with more analysis we can do better. Not sure how important that is. But it's not a priority.

#TODO

## Input

`````js filename=intro
let x = 1, y = 2, z = [10, 20, 30];
switch ($('a')) { case $('a'): let [x, y] = ($(x), $(y), $(z)); break; }
$(x, y, z);
`````

## Normalized

`````js filename=intro
let x = 1;
let y = 2;
let z = [10, 20, 30];
let x$1;
let y$1;
const tmpSwitchTest = $('a');
let tmpSwitchCaseToStart = 1;
const tmpBinLhs = $('a');
const tmpIfTest = tmpBinLhs === tmpSwitchTest;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
}
tmpSwitchBreak: {
  const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$1) {
    $(x$1);
    $(y$1);
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
const tmpSwitchTest = $('a');
let tmpSwitchCaseToStart = 1;
const tmpBinLhs = $('a');
const tmpIfTest = tmpBinLhs === tmpSwitchTest;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
}
tmpSwitchBreak: {
  const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$1) {
    $(undefined);
    $(undefined);
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
 - eval returned: ("<crash[ Cannot access '<ref>' before initialization ]>")

Normalized calls: BAD?!
 - 1: 'a'
 - 2: 'a'
 - 3: undefined
 - 4: undefined
 - 5: [10, 20, 30]
 - 6: 1, 2, [10, 20, 30]
 - eval returned: undefined

Final output calls: BAD!!
 - 1: 'a'
 - 2: 'a'
 - 3: undefined
 - 4: undefined
 - 5: [10, 20, 30]
 - 6: 1, 2, [10, 20, 30]
 - eval returned: undefined
