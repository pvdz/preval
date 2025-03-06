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
const tmpSwitchDisc /*:unknown*/ = $(`a`);
const tmpBinBothRhs /*:unknown*/ = $(`a`);
const tmpIfTest /*:boolean*/ = tmpSwitchDisc === tmpBinBothRhs;
const z /*:array*/ = [10, 20, 30];
if (tmpIfTest) {
  const arrPatternSplat /*:array*/ = [...z];
  const tmpClusterSSA_x /*:unknown*/ = arrPatternSplat[0];
  const tmpClusterSSA_y /*:unknown*/ = arrPatternSplat[1];
  $(1, tmpClusterSSA_x, tmpClusterSSA_y, z);
} else {
  $(1, 1, 2, z);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( "a" );
const b = $( "a" );
const c = a === b;
const d = [ 10, 20, 30 ];
if (c) {
  const e = [ ...d ];
  const f = e[ 0 ];
  const g = e[ 1 ];
  $( 1, f, g, d );
}
else {
  $( 1, 1, 2, d );
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

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope