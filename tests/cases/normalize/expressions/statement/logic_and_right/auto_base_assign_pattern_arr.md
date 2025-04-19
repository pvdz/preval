# Preval test case

# auto_base_assign_pattern_arr.md

> Normalize > Expressions > Statement > Logic and right > Auto base assign pattern arr
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = [];

let a = { a: 999, b: 1000 };
$(100) && ([b] = $([$(2)]));
$(a, b);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(100);
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  const tmpArrElement /*:unknown*/ = $(2);
  const tmpCalleeParam /*:array*/ = [tmpArrElement];
  const tmpArrAssignPatternRhs /*:unknown*/ = $(tmpCalleeParam);
  const tmpArrPatternSplat /*:array*/ = [...tmpArrAssignPatternRhs];
  const tmpClusterSSA_b /*:unknown*/ = tmpArrPatternSplat[0];
  $(a, tmpClusterSSA_b);
} else {
  const b /*:array*/ = [];
  $(a, b);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $(100);
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  const tmpArrElement = $(2);
  const tmpArrAssignPatternRhs = $([tmpArrElement]);
  $(a, [...tmpArrAssignPatternRhs][0]);
} else {
  $(a, []);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
const b = {
  a: 999,
  b: 1000,
};
if (a) {
  const c = $( 2 );
  const d = [ c ];
  const e = $( d );
  const f = [ ...e ];
  const g = f[ 0 ];
  $( b, g );
}
else {
  const h = [];
  $( b, h );
}
`````


## Todos triggered


- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
- (todo) Deal with array spreads in arr mutation?


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: 2
 - 3: [2]
 - 4: { a: '999', b: '1000' }, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
