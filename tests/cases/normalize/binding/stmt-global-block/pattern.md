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
  const z /*:array*/ = [10, 20, 30];
  const arrPatternSplat /*:array*/ = [...z];
  const a /*:unknown*/ = arrPatternSplat[0];
  const b /*:unknown*/ = arrPatternSplat[1];
  $(a, b, 1, 2, z);
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(true)) {
  const z = [10, 20, 30];
  const arrPatternSplat = [...z];
  $(arrPatternSplat[0], arrPatternSplat[1], 1, 2, z);
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


## Todos triggered


- inline computed array property read
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


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
