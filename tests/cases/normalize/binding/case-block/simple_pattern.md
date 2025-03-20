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


## Settled


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


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $(`a`) === $(`a`);
const z = [10, 20, 30];
if (tmpIfTest) {
  const arrPatternSplat = [...z];
  $(1, arrPatternSplat[0], arrPatternSplat[1], z);
} else {
  $(1, 1, 2, z);
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
  const e = [ ...d ];
  const f = e[ 0 ];
  const g = e[ 1 ];
  $( 1, f, g, d );
}
else {
  $( 1, 1, 2, d );
}
`````


## Todos triggered


- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
- inline computed array property read


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'a'
 - 2: 'a'
 - 3: 1, 10, 20, [10, 20, 30]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
