# Preval test case

# pattern_sequence_complex.md

> normalize > assignment > case-block > pattern_sequence_complex
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
const tmpSwitchTest = $('a');
{
  let bindingPatternArrRoot;
  let arrPatternSplat;
  let x_1;
  let y_1;
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
      $(x_1);
      $(y_1);
      bindingPatternArrRoot = $(z);
      arrPatternSplat = [...bindingPatternArrRoot];
      x_1 = arrPatternSplat[0];
      y_1 = arrPatternSplat[1];
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
  let x_1;
  let y_1;
  let tmpSwitchCaseToStart = 1;
  const tmpBinLhs = $('a');
  const tmpIfTest = tmpBinLhs === tmpSwitchTest;
  if (tmpIfTest) {
    tmpSwitchCaseToStart = 0;
  }
  tmpSwitchBreak: {
    const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
    if (tmpIfTest$1) {
      $(x_1);
      $(y_1);
      const bindingPatternArrRoot = $(z);
      const arrPatternSplat = [...bindingPatternArrRoot];
      x_1 = arrPatternSplat[0];
      y_1 = arrPatternSplat[1];
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
