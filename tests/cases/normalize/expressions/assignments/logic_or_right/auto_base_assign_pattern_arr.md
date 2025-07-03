# Preval test case

# auto_base_assign_pattern_arr.md

> Normalize > Expressions > Assignments > Logic or right > Auto base assign pattern arr
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = [];

let a = { a: 999, b: 1000 };
$($(100) || (a = [b] = $([$(2)])));
$(a, b);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(100);
if (tmpCalleeParam) {
  $(tmpCalleeParam);
  const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
  const b /*:array*/ /*truthy*/ = [];
  $(a, b);
} else {
  const tmpArrElement /*:unknown*/ = $(2);
  const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [tmpArrElement];
  const tmpNestedAssignArrPatternRhs /*:unknown*/ = $(tmpCalleeParam$1);
  const tmpArrPatternSplat /*:array*/ /*truthy*/ = [...tmpNestedAssignArrPatternRhs];
  const tmpClusterSSA_b /*:unknown*/ = tmpArrPatternSplat[0];
  $(tmpNestedAssignArrPatternRhs);
  $(tmpNestedAssignArrPatternRhs, tmpClusterSSA_b);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCalleeParam = $(100);
if (tmpCalleeParam) {
  $(tmpCalleeParam);
  $({ a: 999, b: 1000 }, []);
} else {
  const tmpArrElement = $(2);
  const tmpNestedAssignArrPatternRhs = $([tmpArrElement]);
  const tmpClusterSSA_b = [...tmpNestedAssignArrPatternRhs][0];
  $(tmpNestedAssignArrPatternRhs);
  $(tmpNestedAssignArrPatternRhs, tmpClusterSSA_b);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
if (a) {
  $( a );
  const b = {
    a: 999,
    b: 1000,
  };
  const c = [];
  $( b, c );
}
else {
  const d = $( 2 );
  const e = [ d ];
  const f = $( e );
  const g = [ ...f ];
  const h = g[ 0 ];
  $( f );
  $( f, h );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = [];
let a = { a: 999, b: 1000 };
let tmpCalleeParam = $(100);
if (tmpCalleeParam) {
  $(tmpCalleeParam);
  $(a, b);
} else {
  let tmpNestedComplexRhs = undefined;
  const tmpArrElement = $(2);
  let tmpCalleeParam$1 = [tmpArrElement];
  const tmpNestedAssignArrPatternRhs = $(tmpCalleeParam$1);
  const tmpArrPatternSplat = [...tmpNestedAssignArrPatternRhs];
  b = tmpArrPatternSplat[0];
  tmpNestedComplexRhs = tmpNestedAssignArrPatternRhs;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
  $(a, b);
}
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) array reads var statement with init CallExpression
- (todo) array reads var statement with init ObjectExpression
- (todo) support array reads statement type ExpressionStatement
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: { a: '999', b: '1000' }, []
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
