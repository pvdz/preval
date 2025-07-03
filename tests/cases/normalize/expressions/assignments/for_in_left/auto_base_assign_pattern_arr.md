# Preval test case

# auto_base_assign_pattern_arr.md

> Normalize > Expressions > Assignments > For in left > Auto base assign pattern arr
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = [];

let a = { a: 999, b: 1000 };
for ((a = [b] = $([$(2)])).x in $({ x: 1 }));
$(a, b);
`````


## Settled


`````js filename=intro
let b /*:unknown*/ = [];
let a /*:unknown*/ = { a: 999, b: 1000 };
const tmpCalleeParam$1 /*:object*/ /*truthy*/ = { x: 1 };
const tmpCalleeParam /*:unknown*/ = $(tmpCalleeParam$1);
const tmpForInGenNext /*:unknown*/ = $forIn(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForInNext /*:unknown*/ = tmpForInGenNext();
  const tmpIfTest /*:unknown*/ = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const tmpArrElement /*:unknown*/ = $(2);
    const tmpCalleeParam$3 /*:array*/ /*truthy*/ = [tmpArrElement];
    const tmpNestedAssignArrPatternRhs /*:unknown*/ = $(tmpCalleeParam$3);
    const tmpArrPatternSplat /*:array*/ /*truthy*/ = [...tmpNestedAssignArrPatternRhs];
    b = tmpArrPatternSplat[0];
    a = tmpNestedAssignArrPatternRhs;
    const tmpAssignMemRhs /*:unknown*/ = tmpForInNext.value;
    tmpNestedAssignArrPatternRhs.x = tmpAssignMemRhs;
  }
}
$(a, b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let b = [];
let a = { a: 999, b: 1000 };
const tmpForInGenNext = $forIn($({ x: 1 }));
while (true) {
  const tmpForInNext = tmpForInGenNext();
  if (tmpForInNext.done) {
    break;
  } else {
    const tmpArrElement = $(2);
    const tmpNestedAssignArrPatternRhs = $([tmpArrElement]);
    b = [...tmpNestedAssignArrPatternRhs][0];
    a = tmpNestedAssignArrPatternRhs;
    tmpNestedAssignArrPatternRhs.x = tmpForInNext.value;
  }
}
$(a, b);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = [];
let b = {
  a: 999,
  b: 1000,
};
const c = { x: 1 };
const d = $( c );
const e = $forIn( d );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const f = e();
  const g = f.done;
  if (g) {
    break;
  }
  else {
    const h = $( 2 );
    const i = [ h ];
    const j = $( i );
    const k = [ ...j ];
    a = k[ 0 ];
    b = j;
    const l = f.value;
    j.x = l;
  }
}
$( b, a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = [];
let a = { a: 999, b: 1000 };
let tmpCalleeParam$1 = { x: 1 };
let tmpCalleeParam = $(tmpCalleeParam$1);
const tmpForInGenNext = $forIn(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForInNext = tmpForInGenNext();
  const tmpIfTest = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const tmpArrElement = $(2);
    let tmpCalleeParam$3 = [tmpArrElement];
    const tmpNestedAssignArrPatternRhs = $(tmpCalleeParam$3);
    const tmpArrPatternSplat = [...tmpNestedAssignArrPatternRhs];
    b = tmpArrPatternSplat[0];
    a = tmpNestedAssignArrPatternRhs;
    const tmpAssignMemLhsObj = a;
    const tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
    const tmpAssignMemRhs = tmpForInNext.value;
    tmpAssignMemLhsObj$1.x = tmpAssignMemRhs;
  }
}
$(a, b);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) array reads var statement with init CallExpression
- (todo) array reads var statement with init ObjectExpression
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: '1' }
 - 2: 2
 - 3: [2]
 - 4: [2], 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
