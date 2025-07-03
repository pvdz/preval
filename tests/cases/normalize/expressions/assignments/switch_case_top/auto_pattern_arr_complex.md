# Preval test case

# auto_pattern_arr_complex.md

> Normalize > Expressions > Assignments > Switch case top > Auto pattern arr complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let [a] = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1):
    [a] = $([1, 2]);
}
$(a);
`````


## Settled


`````js filename=intro
const tmpBindingPatternArrRoot /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
const tmpArrPatternSplat /*:array*/ /*truthy*/ = [...tmpBindingPatternArrRoot];
const a /*:unknown*/ = tmpArrPatternSplat[0];
const tmpBinBothLhs /*:unknown*/ = $(1);
const tmpBinBothRhs /*:unknown*/ = $(1);
const tmpIfTest /*:boolean*/ = tmpBinBothLhs === tmpBinBothRhs;
if (tmpIfTest) {
  const tmpCalleeParam /*:array*/ /*truthy*/ = [1, 2];
  const tmpArrAssignPatternRhs /*:unknown*/ = $(tmpCalleeParam);
  const tmpArrPatternSplat$1 /*:array*/ /*truthy*/ = [...tmpArrAssignPatternRhs];
  const tmpClusterSSA_a /*:unknown*/ = tmpArrPatternSplat$1[0];
  $(tmpClusterSSA_a);
} else {
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpBindingPatternArrRoot = { a: 999, b: 1000 };
const a = [...tmpBindingPatternArrRoot][0];
if ($(1) === $(1)) {
  const tmpArrAssignPatternRhs = $([1, 2]);
  $([...tmpArrAssignPatternRhs][0]);
} else {
  $(a);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {
  a: 999,
  b: 1000,
};
const b = [ ...a ];
const c = b[ 0 ];
const d = $( 1 );
const e = $( 1 );
const f = d === e;
if (f) {
  const g = [ 1, 2 ];
  const h = $( g );
  const i = [ ...h ];
  const j = i[ 0 ];
  $( j );
}
else {
  $( c );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpBindingPatternArrRoot = { a: 999, b: 1000 };
let tmpArrPatternSplat = [...tmpBindingPatternArrRoot];
let a = tmpArrPatternSplat[0];
const tmpSwitchDisc = $(1);
const tmpBinBothLhs = tmpSwitchDisc;
const tmpBinBothRhs = $(1);
const tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
if (tmpIfTest) {
  let tmpCalleeParam = [1, 2];
  const tmpArrAssignPatternRhs = $(tmpCalleeParam);
  const tmpArrPatternSplat$1 = [...tmpArrAssignPatternRhs];
  a = tmpArrPatternSplat$1[0];
  $(a);
} else {
  $(a);
}
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) array reads var statement with init CallExpression
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
