# Preval test case

# pattern_sequence_simple.md

> normalize > assignment > case-block > pattern_sequence_simple
>
> Assignments of all kinds should be normalized in all circumstances

TDZ case

#TODO

## Input

`````js filename=intro
let x = 1, y = 2, z = [10, 20, 30];
switch ($('a')) { case $('a'): let [a, b] = ($(x), $(y), z); break; }
$(x, y, z);
`````

## Normalized

`````js filename=intro
let x = 1;
let y = 2;
let z = [10, 20, 30];
const tmpSwitchTest = $('a');
{
  let bindingPatternArrRoot;
  let arrPatternSplat;
  let a;
  let b;
  const tmpSwitchValue = tmpSwitchTest;
  let tmpSwitchCaseToStart = 1;
  const tmpBinLhs = $('a');
  const tmpIfTest = tmpBinLhs === tmpSwitchValue;
  if (tmpIfTest) {
    tmpSwitchCaseToStart = 0;
  }
  tmpSwitchBreak: {
    const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
    if (tmpIfTest$1) {
      $(x);
      $(y);
      bindingPatternArrRoot = z;
      arrPatternSplat = [...bindingPatternArrRoot];
      a = arrPatternSplat[0];
      b = arrPatternSplat[1];
      break tmpSwitchBreak;
    }
  }
}
$(x, y, z);
`````

## Output

`````js filename=intro
let z = [10, 20, 30];
const tmpSwitchTest = $('a');
{
  let a;
  let b;
  let tmpSwitchCaseToStart = 1;
  const tmpBinLhs = $('a');
  const tmpIfTest = tmpBinLhs === tmpSwitchTest;
  if (tmpIfTest) {
    tmpSwitchCaseToStart = 0;
  }
  tmpSwitchBreak: {
    const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
    if (tmpIfTest$1) {
      $(1);
      $(2);
      const bindingPatternArrRoot = z;
      const arrPatternSplat = [...bindingPatternArrRoot];
      a = arrPatternSplat[0];
      b = arrPatternSplat[1];
      break tmpSwitchBreak;
    }
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
 - 5: 1, 2, [10, 20, 30]
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
