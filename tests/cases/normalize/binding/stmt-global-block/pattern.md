# Preval test case

# pattern.md

> Normalize > Binding > Stmt-global-block > Pattern
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
if ($(true)) {
  let x = 1, y = 2, z = [10, 20, 30];
  let [a, b] = z;
  $(a, b, x, y, z);
}
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(true);
if (tmpIfTest) {
  const z /*:array*/ /*truthy*/ = [10, 20, 30];
  const tmpArrPatternSplat /*:array*/ /*truthy*/ = [...z];
  const a /*:unknown*/ = tmpArrPatternSplat[0];
  const b /*:unknown*/ = tmpArrPatternSplat[1];
  $(a, b, 1, 2, z);
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(true)) {
  const z = [10, 20, 30];
  const tmpArrPatternSplat = [...z];
  $(tmpArrPatternSplat[0], tmpArrPatternSplat[1], 1, 2, z);
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
  $( d, e, 1, 2, b );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpIfTest = $(true);
if (tmpIfTest) {
  let x = 1;
  let y = 2;
  let z = [10, 20, 30];
  let tmpBindingPatternArrRoot = z;
  let tmpArrPatternSplat = [...tmpBindingPatternArrRoot];
  let a = tmpArrPatternSplat[0];
  let b = tmpArrPatternSplat[1];
  $(a, b, x, y, z);
} else {
}
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) array reads var statement with init ArrayExpression
- (todo) support array reads statement type ExpressionStatement
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: 10, 20, 1, 2, [10, 20, 30]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
