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


## Settled


`````js filename=intro
const tmpBinBothLhs /*:unknown*/ = $(`a`);
const tmpBinBothRhs /*:unknown*/ = $(`a`);
const tmpIfTest /*:boolean*/ = tmpBinBothLhs === tmpBinBothRhs;
const z /*:array*/ = [10, 20, 30];
if (tmpIfTest) {
  const tmpArrPatternSplat$1 /*:array*/ = [...z];
  const x /*:unknown*/ = tmpArrPatternSplat$1[1];
  const y /*:unknown*/ = tmpArrPatternSplat$1[2];
  [...z];
  $(1, 2, x, y, z);
} else {
  $(1, 2, 1, 2, z);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $(`a`) === $(`a`);
const z = [10, 20, 30];
if (tmpIfTest) {
  const tmpArrPatternSplat$1 = [...z];
  const x = tmpArrPatternSplat$1[1];
  const y = tmpArrPatternSplat$1[2];
  [...z];
  $(1, 2, x, y, z);
} else {
  $(1, 2, 1, 2, z);
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
  const f = e[ 1 ];
  const g = e[ 2 ];
  [ ...d ];
  $( 1, 2, f, g, d );
}
else {
  $( 1, 2, 1, 2, d );
}
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'a'
 - 2: 'a'
 - 3: 1, 2, 20, 30, [10, 20, 30]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
