# Preval test case

# auto_ident_arr_pattern_assign.md

> Normalize > Expressions > Assignments > For of left > Auto ident arr pattern assign
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
for ((a = [x, y] = [$(3), $(4)]).x of $({ x: 1 }));
$(a, x, y);
`````


## Settled


`````js filename=intro
let x /*:unknown*/ = 1;
let y /*:unknown*/ = 2;
let a /*:unknown*/ = { a: 999, b: 1000 };
const tmpCalleeParam$1 /*:object*/ /*truthy*/ = { x: 1 };
const tmpCalleeParam /*:unknown*/ = $(tmpCalleeParam$1);
const tmpForOfGen /*:unknown*/ = $forOf(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForOfNext /*:unknown*/ = tmpForOfGen();
  const tmpIfTest /*:unknown*/ = tmpForOfNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const tmpArrElement /*:unknown*/ = $(3);
    const tmpArrElement$1 /*:unknown*/ = $(4);
    const tmpNestedAssignArrPatternRhs /*:array*/ /*truthy*/ = [tmpArrElement, tmpArrElement$1];
    const tmpArrPatternSplat /*:array*/ /*truthy*/ = [...tmpNestedAssignArrPatternRhs];
    x = tmpArrPatternSplat[0];
    y = tmpArrPatternSplat[1];
    a = tmpNestedAssignArrPatternRhs;
    const tmpAssignMemRhs /*:unknown*/ = tmpForOfNext.value;
    tmpNestedAssignArrPatternRhs.x = tmpAssignMemRhs;
  }
}
$(a, x, y);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let x = 1;
let y = 2;
let a = { a: 999, b: 1000 };
const tmpForOfGen = $forOf($({ x: 1 }));
while (true) {
  const tmpForOfNext = tmpForOfGen();
  if (tmpForOfNext.done) {
    break;
  } else {
    const tmpArrElement = $(3);
    const tmpArrElement$1 = $(4);
    const tmpNestedAssignArrPatternRhs = [tmpArrElement, tmpArrElement$1];
    const tmpArrPatternSplat = [...tmpNestedAssignArrPatternRhs];
    x = tmpArrPatternSplat[0];
    y = tmpArrPatternSplat[1];
    a = tmpNestedAssignArrPatternRhs;
    tmpNestedAssignArrPatternRhs.x = tmpForOfNext.value;
  }
}
$(a, x, y);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = 1;
let b = 2;
let c = {
  a: 999,
  b: 1000,
};
const d = { x: 1 };
const e = $( d );
const f = $forOf( e );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const g = f();
  const h = g.done;
  if (h) {
    break;
  }
  else {
    const i = $( 3 );
    const j = $( 4 );
    const k = [ i, j ];
    const l = [ ...k ];
    a = l[ 0 ];
    b = l[ 1 ];
    c = k;
    const m = g.value;
    k.x = m;
  }
}
$( c, a, b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = 1;
let y = 2;
let a = { a: 999, b: 1000 };
let tmpCalleeParam$1 = { x: 1 };
let tmpCalleeParam = $(tmpCalleeParam$1);
const tmpForOfGen = $forOf(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForOfNext = tmpForOfGen();
  const tmpIfTest = tmpForOfNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const tmpArrElement = $(3);
    const tmpArrElement$1 = $(4);
    const tmpNestedAssignArrPatternRhs = [tmpArrElement, tmpArrElement$1];
    const tmpArrPatternSplat = [...tmpNestedAssignArrPatternRhs];
    x = tmpArrPatternSplat[0];
    y = tmpArrPatternSplat[1];
    a = tmpNestedAssignArrPatternRhs;
    const tmpAssignMemLhsObj = a;
    const tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
    const tmpAssignMemRhs = tmpForOfNext.value;
    tmpAssignMemLhsObj$1.x = tmpAssignMemRhs;
  }
}
$(a, x, y);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) array reads var statement with init ArrayExpression
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: '1' }
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
