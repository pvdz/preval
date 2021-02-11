# Preval test case

# simple_pattern.md

> normalize > assignment > case-block > simple_pattern
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, x = 1, y = 2, z = [10, 20, 30];
switch ($('a')) { case $('a'): let a = [x, y] = z; break; }
$(a, x, y, z);
`````

## Normalized

`````js filename=intro
let a = 1;
let x = 1;
let y = 2;
let z = [10, 20, 30];
const tmpSwitchTest = $('a');
{
  let a_1;
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
        a_1 = undefined;
        const tmpNestedAssignArrPatternRhs = z;
        const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
        x = arrPatternSplat[0];
        y = arrPatternSplat[1];
        a_1 = tmpNestedAssignArrPatternRhs;
        break tmpSwitchBreak;
      }
    }
  }
}
$(a, x, y, z);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 'a'
 - 2: 'a'
 - 3: 1, 10, 20, [10, 20, 30]
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
