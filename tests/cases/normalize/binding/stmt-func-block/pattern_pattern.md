# Preval test case

# pattern_pattern.md

> Normalize > Binding > Stmt-func-block > Pattern pattern
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
function f(){
if ($(true)) {
let x = 1, y = 2, z = [10, 20, 30];
  let [a, b] = [, x, y] = z;
  $(a, b, x, y, z);
}
}
$(f());
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(true);
if (tmpIfTest) {
  const z /*:array*/ = [10, 20, 30];
  const tmpArrPatternSplat$1 /*:array*/ = [...z];
  const tmpClusterSSA_x /*:unknown*/ = tmpArrPatternSplat$1[1];
  const tmpClusterSSA_y /*:unknown*/ = tmpArrPatternSplat$1[2];
  const tmpArrPatternSplat /*:array*/ = [...z];
  const a /*:unknown*/ = tmpArrPatternSplat[0];
  const b /*:unknown*/ = tmpArrPatternSplat[1];
  $(a, b, tmpClusterSSA_x, tmpClusterSSA_y, z);
  $(undefined);
} else {
  $(undefined);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(true)) {
  const z = [10, 20, 30];
  const tmpArrPatternSplat$1 = [...z];
  const tmpClusterSSA_x = tmpArrPatternSplat$1[1];
  const tmpClusterSSA_y = tmpArrPatternSplat$1[2];
  const tmpArrPatternSplat = [...z];
  $(tmpArrPatternSplat[0], tmpArrPatternSplat[1], tmpClusterSSA_x, tmpClusterSSA_y, z);
  $(undefined);
} else {
  $(undefined);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  const b = [ 10, 20, 30 ];
  const c = [ ...b ];
  const d = c[ 1 ];
  const e = c[ 2 ];
  const f = [ ...b ];
  const g = f[ 0 ];
  const h = f[ 1 ];
  $( g, h, d, e, b );
  $( undefined );
}
else {
  $( undefined );
}
`````


## Todos triggered


- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
- (todo) Deal with array spreads in arr mutation?


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: 10, 20, 20, 30, [10, 20, 30]
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
