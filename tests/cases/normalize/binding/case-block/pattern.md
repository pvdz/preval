# Preval test case

# pattern.md

> Normalize > Binding > Case-block > Pattern
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
let x = 1, y = 2, z = [10, 20, 30];
switch ($('a')) { case $('a'): let [x, y] = z; break; }
$(x, y, z);
`````

## Pre Normal


`````js filename=intro
let x = 1,
  y = 2,
  z = [10, 20, 30];
tmpSwitchBreak: {
  let x$1;
  let y$1;
  const tmpSwitchDisc = $(`a`);
  if (tmpSwitchDisc === $(`a`)) {
    [x$1, y$1] = z;
    break tmpSwitchBreak;
  } else {
  }
}
$(x, y, z);
`````

## Normalized


`````js filename=intro
let x = 1;
let y = 2;
let z = [10, 20, 30];
tmpSwitchBreak: {
  let x$1 = undefined;
  let y$1 = undefined;
  const tmpSwitchDisc = $(`a`);
  const tmpBinBothLhs = tmpSwitchDisc;
  const tmpBinBothRhs = $(`a`);
  const tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
  if (tmpIfTest) {
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
const tmpSwitchDisc /*:unknown*/ = $(`a`);
const tmpBinBothRhs /*:unknown*/ = $(`a`);
const tmpIfTest /*:boolean*/ = tmpSwitchDisc === tmpBinBothRhs;
const z /*:array*/ = [10, 20, 30];
if (tmpIfTest) {
  const arrPatternSplat /*:array*/ = [...z];
  arrPatternSplat[0];
  arrPatternSplat[1];
} else {
}
$(1, 2, z);
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
  e[ 0 ];
  e[ 1 ];
}
$( 1, 2, d );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'a'
 - 2: 'a'
 - 3: 1, 2, [10, 20, 30]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope