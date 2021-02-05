# Preval test case

# pattern_sequence_simple.md

> normalize > assignment > case-block > pattern_sequence_simple
>
> Assignments of all kinds should be normalized in all circumstances

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
  let x;
  let y;
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
      ('case 0:');
      {
        $(x);
        $(y);
        const arrAssignPatternRhs = z;
        const arrPatternSplat = [...arrAssignPatternRhs];
        x = arrPatternSplat[0];
        y = arrPatternSplat[1];
        arrAssignPatternRhs;
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
let x = 1;
let y = 2;
let z = [10, 20, 30];
$('a');
let x;
let y;
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
    ('case 0:');
    {
      $(x);
      $(y);
      const arrAssignPatternRhs = z;
      const arrPatternSplat = [...arrAssignPatternRhs];
      x = arrPatternSplat[0];
      y = arrPatternSplat[1];
      arrAssignPatternRhs;
      break tmpSwitchBreak;
    }
    tmpFallthrough = true;
  }
}
$(x, y, z);
`````

## Result

Should call `$` with:
 - 1: 'a'
 - 2: 'a'
 - eval returned: ("<crash[ Cannot access 'x' before initialization ]>")

Normalized calls: BAD?!
 - 1: 'a'
 - 2: 'a'
 - 3: undefined
 - 4: undefined
 - 5: 1, 2, [10, 20, 30]
 - eval returned: undefined

Final output calls: BAD!!
 - eval returned: ("<crash[ Identifier 'x' has already been declared ]>")
