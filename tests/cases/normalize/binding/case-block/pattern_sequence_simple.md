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
switch ($('a')) { case $('a'): let [x, y] = ($(x), $(y), z); break; }
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
        $(x_1);
        $(y_1);
        bindingPatternArrRoot = z;
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
'<skipped>';
`````

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
 - 5: 1, 2, [10, 20, 30]
 - eval returned: undefined

Final output calls: BAD!!
 - eval returned: undefined
