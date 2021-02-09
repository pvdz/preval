# Preval test case

# pattern_sequence_complex.md

> normalize > assignment > case-block > pattern_sequence_complex
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let x = 1, y = 2, z = [10, 20, 30];
switch ($('a')) { case $('a'): let [x, y] = ($(1), $(2), $(z)); break; }
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
  tmpSwitchBreak: {
    let tmpFallthrough = false;
    let tmpIfTest = tmpFallthrough;
    if (tmpIfTest) {
    } else {
      const tmpBinBothLhs = tmpSwitchTest;
      const tmpBinBothRhs = $('a');
      tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
    }
    if (tmpIfTest) {
      {
        $(1);
        $(2);
        bindingPatternArrRoot = $(z);
        arrPatternSplat = [...bindingPatternArrRoot];
        x_1 = arrPatternSplat[0];
        y_1 = arrPatternSplat[1];
        break tmpSwitchBreak;
      }
      tmpFallthrough = true;
    }
  }
}
$(x, y, z);
`````

## Output

`````js filename=intro
let z = [10, 20, 30];
$('a');
tmpSwitchBreak: {
  let tmpFallthrough = false;
  let tmpIfTest = tmpFallthrough;
  if (tmpIfTest) {
  } else {
    const tmpBinBothLhs = tmpSwitchTest;
    const tmpBinBothRhs = $('a');
    tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
  }
  if (tmpIfTest) {
    {
      $(1);
      $(2);
      bindingPatternArrRoot = $(z);
      arrPatternSplat = [...bindingPatternArrRoot];
      x_1 = arrPatternSplat[0];
      y_1 = arrPatternSplat[1];
      break tmpSwitchBreak;
    }
    tmpFallthrough = true;
  }
}
$(1, 2, z);
`````

## Result

Should call `$` with:
 - 1: 'a'
 - 2: 'a'
 - 3: 1
 - 4: 2
 - 5: [10, 20, 30]
 - 6: 1, 2, [10, 20, 30]
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - 1: 'a'
 - eval returned: ('<crash[ <ref> is not defined ]>')
