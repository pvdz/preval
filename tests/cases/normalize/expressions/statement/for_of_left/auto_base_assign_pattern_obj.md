# Preval test case

# auto_base_assign_pattern_obj.md

> Normalize > Expressions > Statement > For of left > Auto base assign pattern obj
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = {};

let a = { a: 999, b: 1000 };
for (({ b } = $({ b: $(2) })).x of $({ x: 1 }));
$(a, b);
`````


## Settled


`````js filename=intro
let b /*:unknown*/ = {};
const tmpCalleeParam$1 /*:object*/ = { x: 1 };
const tmpCalleeParam /*:unknown*/ = $(tmpCalleeParam$1);
const tmpForOfGen /*:unknown*/ = $forOf(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForOfNext /*:unknown*/ = tmpForOfGen();
  const tmpIfTest /*:unknown*/ = tmpForOfNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const tmpObjLitVal /*:unknown*/ = $(2);
    const tmpCalleeParam$3 /*:object*/ = { b: tmpObjLitVal };
    const tmpNestedAssignObjPatternRhs /*:unknown*/ = $(tmpCalleeParam$3);
    b = tmpNestedAssignObjPatternRhs.b;
    const tmpAssignMemRhs /*:unknown*/ = tmpForOfNext.value;
    tmpNestedAssignObjPatternRhs.x = tmpAssignMemRhs;
  }
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a, b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let b = {};
const tmpForOfGen = $forOf($({ x: 1 }));
while (true) {
  const tmpForOfNext = tmpForOfGen();
  if (tmpForOfNext.done) {
    break;
  } else {
    const tmpObjLitVal = $(2);
    const tmpNestedAssignObjPatternRhs = $({ b: tmpObjLitVal });
    b = tmpNestedAssignObjPatternRhs.b;
    tmpNestedAssignObjPatternRhs.x = tmpForOfNext.value;
  }
}
$({ a: 999, b: 1000 }, b);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = {};
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
    const h = { b: g };
    const i = $( h );
    a = i.b;
    const j = e.value;
    i.x = j;
  }
}
const k = {
  a: 999,
  b: 1000,
};
$( k, a );
`````


## Todos triggered


None


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
