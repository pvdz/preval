# Preval test case

# simple_pattern.md

> Normalize > Binding > Stmt-func-block > Simple pattern
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
function f(){
if ($(true)) {
let x = 1, y = 2, z = [10, 20, 30];
  let a= [x, y] = z;
  $(a, x, y, z);
}
}
$(f());
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(true);
if (tmpIfTest) {
  const z /*:array*/ = [10, 20, 30];
  const tmpArrPatternSplat /*:array*/ = [...z];
  const x /*:unknown*/ = tmpArrPatternSplat[0];
  const y /*:unknown*/ = tmpArrPatternSplat[1];
  $(z, x, y, z);
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
  const tmpArrPatternSplat = [...z];
  $(z, tmpArrPatternSplat[0], tmpArrPatternSplat[1], z);
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
  const d = c[ 0 ];
  const e = c[ 1 ];
  $( b, d, e, b );
  $( undefined );
}
else {
  $( undefined );
}
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) support array reads statement type VarStatement
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: [10, 20, 30], 10, 20, [10, 20, 30]
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
