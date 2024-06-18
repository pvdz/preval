# Preval test case

# simple_pattern.md

> Normalize > Binding > Case-block > Simple pattern
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
let a = 1, x = 1, y = 2, z = [10, 20, 30];
switch ($('a')) { case $('a'): let a = [x, y] = z; break; }
$(a, x, y, z);
`````

## Pre Normal


`````js filename=intro
let a = 1,
  x = 1,
  y = 2,
  z = [10, 20, 30];
tmpSwitchBreak: {
  let a$1;
  const tmpSwitchDisc = $(`a`);
  if (tmpSwitchDisc === $(`a`)) {
    a$1 = [x, y] = z;
    break tmpSwitchBreak;
  } else {
  }
}
$(a, x, y, z);
`````

## Normalized


`````js filename=intro
let a = 1;
let x = 1;
let y = 2;
let z = [10, 20, 30];
tmpSwitchBreak: {
  let a$1 = undefined;
  const tmpSwitchDisc = $(`a`);
  const tmpBinBothLhs = tmpSwitchDisc;
  const tmpBinBothRhs = $(`a`);
  const tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
  if (tmpIfTest) {
    const tmpNestedAssignArrPatternRhs = z;
    const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
    x = arrPatternSplat[0];
    y = arrPatternSplat[1];
    a$1 = tmpNestedAssignArrPatternRhs;
    break tmpSwitchBreak;
  } else {
  }
}
$(a, x, y, z);
`````

## Output


`````js filename=intro
const z = [10, 20, 30];
const tmpSwitchDisc = $(`a`);
const tmpBinBothRhs = $(`a`);
const tmpIfTest = tmpSwitchDisc === tmpBinBothRhs;
if (tmpIfTest) {
  const arrPatternSplat = [...z];
  const tmpClusterSSA_x = arrPatternSplat[0];
  const tmpClusterSSA_y = arrPatternSplat[1];
  $(1, tmpClusterSSA_x, tmpClusterSSA_y, z);
} else {
  $(1, 1, 2, z);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ 10, 20, 30 ];
const b = $( "a" );
const c = $( "a" );
const d = b === c;
if (d) {
  const e = [ ... a ];
  const f = e[ 0 ];
  const g = e[ 1 ];
  $( 1, f, g, a );
}
else {
  $( 1, 1, 2, a );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'a'
 - 2: 'a'
 - 3: 1, 10, 20, [10, 20, 30]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
