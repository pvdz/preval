# Preval test case

# pattern_sequence_simple.md

> Normalize > Binding > Case-block > Pattern sequence simple
>
> Assignments of all kinds should be normalized in all circumstances

TDZ case

## Input

`````js filename=intro
let x = 1, y = 2, z = [10, 20, 30];
switch ($('a')) { case $('a'): let [a, b] = ($(x), $(y), z); break; }
$(x, y, z);
`````

## Settled


`````js filename=intro
const tmpSwitchDisc /*:unknown*/ = $(`a`);
const tmpBinBothRhs /*:unknown*/ = $(`a`);
const tmpIfTest /*:boolean*/ = tmpSwitchDisc === tmpBinBothRhs;
const z /*:array*/ = [10, 20, 30];
if (tmpIfTest) {
  $(1);
  $(2);
  const arrPatternSplat /*:array*/ = [...z];
  arrPatternSplat[0];
  arrPatternSplat[1];
} else {
}
$(1, 2, z);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $(`a`) === $(`a`);
const z = [10, 20, 30];
if (tmpIfTest) {
  $(1);
  $(2);
  const arrPatternSplat = [...z];
  arrPatternSplat[0];
  arrPatternSplat[1];
}
$(1, 2, z);
`````

## Pre Normal


`````js filename=intro
let x = 1,
  y = 2,
  z = [10, 20, 30];
tmpSwitchBreak: {
  let a;
  let b;
  const tmpSwitchDisc = $(`a`);
  if (tmpSwitchDisc === $(`a`)) {
    [a, b] = ($(x), $(y), z);
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
  let a = undefined;
  let b = undefined;
  const tmpSwitchDisc = $(`a`);
  const tmpBinBothLhs = tmpSwitchDisc;
  const tmpBinBothRhs = $(`a`);
  const tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
  if (tmpIfTest) {
    $(x);
    $(y);
    const arrAssignPatternRhs = z;
    const arrPatternSplat = [...arrAssignPatternRhs];
    a = arrPatternSplat[0];
    b = arrPatternSplat[1];
    break tmpSwitchBreak;
  } else {
  }
}
$(x, y, z);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( "a" );
const b = $( "a" );
const c = a === b;
const d = [ 10, 20, 30 ];
if (c) {
  $( 1 );
  $( 2 );
  const e = [ ...d ];
  e[ 0 ];
  e[ 1 ];
}
$( 1, 2, d );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'a'
 - 2: 'a'
 - 3: 1
 - 4: 2
 - 5: 1, 2, [10, 20, 30]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope