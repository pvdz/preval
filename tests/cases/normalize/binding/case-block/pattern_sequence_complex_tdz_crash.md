# Preval test case

# pattern_sequence_complex_tdz_crash.md

> Normalize > Binding > Case-block > Pattern sequence complex tdz crash
>
> Assignments of all kinds should be normalized in all circumstances

For now I guess we can't really support this TDZ case. We have to outline the binding.

Maybe in the future we can come up with a solution where with more analysis we can do better. Not sure how important that is. But it's not a priority.

## Options

TDZ errors are not properly emulated so a n eval mismatch is expected

- skipEval

## Input

`````js filename=intro
let x = 1, y = 2, z = [10, 20, 30];
switch ($('a')) { case $('a'): let [x, y] = ($(x), $(y), $(z)); break; }
$(x, y, z);
`````


## Settled


`````js filename=intro
const tmpSwitchDisc /*:unknown*/ = $(`a`);
const tmpBinBothRhs /*:unknown*/ = $(`a`);
const tmpIfTest /*:boolean*/ = tmpSwitchDisc === tmpBinBothRhs;
const z /*:array*/ = [10, 20, 30];
if (tmpIfTest) {
  $(undefined);
  $(undefined);
  const arrAssignPatternRhs /*:unknown*/ = $(z);
  const arrPatternSplat /*:array*/ = [...arrAssignPatternRhs];
  arrPatternSplat[0];
  arrPatternSplat[1];
  $(1, 2, z);
} else {
  $(1, 2, z);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $(`a`) === $(`a`);
const z = [10, 20, 30];
if (tmpIfTest) {
  $(undefined);
  $(undefined);
  const arrAssignPatternRhs = $(z);
  const arrPatternSplat = [...arrAssignPatternRhs];
  arrPatternSplat[0];
  arrPatternSplat[1];
  $(1, 2, z);
} else {
  $(1, 2, z);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "a" );
const b = $( "a" );
const c = a === b;
const d = [ 10, 20, 30 ];
if (c) {
  $( undefined );
  $( undefined );
  const e = $( d );
  const f = [ ...e ];
  f[ 0 ];
  f[ 1 ];
  $( 1, 2, d );
}
else {
  $( 1, 2, d );
}
`````


## Todos triggered


- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
- inline computed array property read


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<skipped by option>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
