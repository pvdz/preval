# Preval test case

# pattern_sequence_complex.md

> Normalize > Binding > Case-block > Pattern sequence complex
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
let x = 1, y = 2, z = [10, 20, 30];
switch ($('a')) { case $('a'): let [x, y] = ($(1), $(2), $(z)); break; }
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
    [x$1, y$1] = ($(1), $(2), $(z));
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
    $(1);
    $(2);
    const arrAssignPatternRhs = $(z);
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
  $(1);
  $(2);
  const arrAssignPatternRhs /*:unknown*/ = $(z);
  const arrPatternSplat /*:array*/ = [...arrAssignPatternRhs];
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
  $( 1 );
  $( 2 );
  const e = $( d );
  const f = [ ...e ];
  f[ 0 ];
  f[ 1 ];
}
$( 1, 2, d );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'a'
 - 2: 'a'
 - 3: 1
 - 4: 2
 - 5: [10, 20, 30]
 - 6: 1, 2, [10, 20, 30]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope