# Preval test case

# auto_base_assign_pattern_arr.md

> Normalize > Expressions > Statement > For in left > Auto base assign pattern arr
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = [];

let a = { a: 999, b: 1000 };
for (([b] = $([$(2)])).x in $({ x: 1 }));
$(a, b);
`````

## Settled


`````js filename=intro
let b /*:unknown*/ = [];
const tmpCalleeParam$1 /*:object*/ = { x: 1 };
const tmpCalleeParam /*:unknown*/ = $(tmpCalleeParam$1);
const tmpForInGen /*:unknown*/ = $forIn(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForInNext /*:unknown*/ = tmpForInGen.next();
  const tmpIfTest /*:unknown*/ = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const tmpArrElement /*:unknown*/ = $(2);
    const tmpCalleeParam$3 /*:array*/ = [tmpArrElement];
    const tmpNestedAssignArrPatternRhs /*:unknown*/ = $(tmpCalleeParam$3);
    const arrPatternSplat /*:array*/ = [...tmpNestedAssignArrPatternRhs];
    b = arrPatternSplat[0];
    const tmpAssignMemRhs /*:unknown*/ = tmpForInNext.value;
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
const tmpForInGen = $forIn($({ x: 1 }));
while (true) {
  const tmpForInNext = tmpForInGen.next();
  if (tmpForInNext.done) {
    break;
  } else {
    const tmpArrElement = $(2);
    const tmpNestedAssignArrPatternRhs = $([tmpArrElement]);
    b = [...tmpNestedAssignArrPatternRhs][0];
    tmpNestedAssignArrPatternRhs.x = tmpForInNext.value;
  }
}
$({ a: 999, b: 1000 }, b);
`````

## Pre Normal


`````js filename=intro
let b = [];
let a = { a: 999, b: 1000 };
{
  let tmpForInGen = $forIn($({ x: 1 }));
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    let tmpForInNext = tmpForInGen.next();
    if (tmpForInNext.done) {
      break;
    } else {
      ([b] = $([$(2)])).x = tmpForInNext.value;
    }
  }
}
$(a, b);
`````

## Normalized


`````js filename=intro
let b = [];
let a = { a: 999, b: 1000 };
const tmpCalleeParam$1 = { x: 1 };
const tmpCalleeParam = $(tmpCalleeParam$1);
let tmpForInGen = $forIn(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  let tmpForInNext = tmpForInGen.next();
  const tmpIfTest = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    let tmpAssignMemLhsObj = undefined;
    const tmpArrElement = $(2);
    const tmpCalleeParam$3 = [tmpArrElement];
    const tmpNestedAssignArrPatternRhs = $(tmpCalleeParam$3);
    const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
    b = arrPatternSplat[0];
    tmpAssignMemLhsObj = tmpNestedAssignArrPatternRhs;
    const tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
    const tmpAssignMemRhs = tmpForInNext.value;
    tmpAssignMemLhsObj$1.x = tmpAssignMemRhs;
  }
}
$(a, b);
`````

## PST Settled
With rename=true

`````js filename=intro
let a = [];
const b = { x: 1 };
const c = $( b );
const d = $forIn( c );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const e = d.next();
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

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { x: '1' }
 - 2: 2
 - 3: [2]
 - 4: { a: '999', b: '1000' }, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
- Calling a static method on an ident that is not global and not recorded: $tmpForInGen_next
