# Preval test case

# auto_base_assign_pattern_arr.md

> Normalize > Expressions > Statement > For of left > Auto base assign pattern arr
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = [];

let a = { a: 999, b: 1000 };
for (([b] = $([$(2)])).x of $({ x: 1 }));
$(a, b);
`````


## Settled


`````js filename=intro
let b /*:unknown*/ = [];
const tmpCalleeParam$1 /*:object*/ = { x: 1 };
const tmpCalleeParam /*:unknown*/ = $(tmpCalleeParam$1);
const tmpForOfGen /*:unknown*/ = $forOf(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForOfNext /*:unknown*/ = tmpForOfGen();
  const tmpIfTest /*:unknown*/ = tmpForOfNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const tmpArrElement /*:unknown*/ = $(2);
    const tmpCalleeParam$3 /*:array*/ = [tmpArrElement];
    const tmpNestedAssignArrPatternRhs /*:unknown*/ = $(tmpCalleeParam$3);
    const tmpArrPatternSplat /*:array*/ = [...tmpNestedAssignArrPatternRhs];
    b = tmpArrPatternSplat[0];
    const tmpAssignMemRhs /*:unknown*/ = tmpForOfNext.value;
    tmpNestedAssignArrPatternRhs.x = tmpAssignMemRhs;
  }
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a, b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let b = [];
const tmpForOfGen = $forOf($({ x: 1 }));
while (true) {
  const tmpForOfNext = tmpForOfGen();
  if (tmpForOfNext.done) {
    break;
  } else {
    const tmpArrElement = $(2);
    const tmpNestedAssignArrPatternRhs = $([tmpArrElement]);
    b = [...tmpNestedAssignArrPatternRhs][0];
    tmpNestedAssignArrPatternRhs.x = tmpForOfNext.value;
  }
}
$({ a: 999, b: 1000 }, b);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = [];
const b = { x: 1 };
const c = $( b );
const d = $forOf( c );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const e = d();
  const f = e.done;
  if (f) {
    break;
  }
  else {
    const g = $( 2 );
    const h = [ g ];
    const i = $( h );
    const j = [ ...i ];
    a = j[ 0 ];
    const k = e.value;
    i.x = k;
  }
}
const l = {
  a: 999,
  b: 1000,
};
$( l, a );
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) support array reads statement type VarStatement
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
