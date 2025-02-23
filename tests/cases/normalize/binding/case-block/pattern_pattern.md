# Preval test case

# pattern_pattern.md

> Normalize > Binding > Case-block > Pattern pattern
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
let a = 1, b = 2, x = 1, y = 2, z = [10, 20, 30];
switch ($('a')) { case $('a'): let [a, b] = [, x, y] = z; break; }
$(a, b, x, y, z);
`````

## Pre Normal


`````js filename=intro
let a = 1,
  b = 2,
  x = 1,
  y = 2,
  z = [10, 20, 30];
tmpSwitchBreak: {
  let a$1;
  let b$1;
  const tmpSwitchDisc = $(`a`);
  if (tmpSwitchDisc === $(`a`)) {
    [a$1, b$1] = [, x, y] = z;
    break tmpSwitchBreak;
  } else {
  }
}
$(a, b, x, y, z);
`````

## Normalized


`````js filename=intro
let a = 1;
let b = 2;
let x = 1;
let y = 2;
let z = [10, 20, 30];
tmpSwitchBreak: {
  let a$1 = undefined;
  let b$1 = undefined;
  const tmpSwitchDisc = $(`a`);
  const tmpBinBothLhs = tmpSwitchDisc;
  const tmpBinBothRhs = $(`a`);
  const tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
  if (tmpIfTest) {
    let arrAssignPatternRhs = undefined;
    const tmpNestedAssignArrPatternRhs = z;
    const arrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs];
    x = arrPatternSplat$1[1];
    y = arrPatternSplat$1[2];
    arrAssignPatternRhs = tmpNestedAssignArrPatternRhs;
    const arrPatternSplat = [...arrAssignPatternRhs];
    a$1 = arrPatternSplat[0];
    b$1 = arrPatternSplat[1];
    break tmpSwitchBreak;
  } else {
  }
}
$(a, b, x, y, z);
`````

## Output


`````js filename=intro
let x /*:unknown*/ = 1;
let y /*:unknown*/ = 2;
const tmpSwitchDisc /*:unknown*/ = $(`a`);
const tmpBinBothRhs /*:unknown*/ = $(`a`);
const tmpIfTest /*:boolean*/ = tmpSwitchDisc === tmpBinBothRhs;
const z /*:array*/ = [10, 20, 30];
if (tmpIfTest) {
  const arrPatternSplat$1 /*:array*/ = [...z];
  x = arrPatternSplat$1[1];
  y = arrPatternSplat$1[2];
  const arrPatternSplat /*:array*/ = [...z];
  arrPatternSplat[0];
  arrPatternSplat[1];
} else {
}
$(1, 2, x, y, z);
`````

## PST Output

With rename=true

`````js filename=intro
let a = 1;
let b = 2;
const c = $( "a" );
const d = $( "a" );
const e = c === d;
const f = [ 10, 20, 30 ];
if (e) {
  const g = [ ...f ];
  a = g[ 1 ];
  b = g[ 2 ];
  const h = [ ...f ];
  h[ 0 ];
  h[ 1 ];
}
$( 1, 2, a, b, f );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'a'
 - 2: 'a'
 - 3: 1, 2, 20, 30, [10, 20, 30]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
