# Preval test case

# auto_pattern_obj_complex.md

> Normalize > Expressions > Assignments > For of left > Auto pattern obj complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let { a } = { a: 999, b: 1000 };
for (({ a } = $({ a: 1, b: 2 })).x of $({ x: 1 }));
$(a);
`````


## Settled


`````js filename=intro
let a /*:unknown*/ = 999;
const tmpCalleeParam$1 /*:object*/ = { x: 1 };
const tmpCalleeParam /*:unknown*/ = $(tmpCalleeParam$1);
const tmpForOfGen /*:unknown*/ = $forOf(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForOfNext /*:unknown*/ = tmpForOfGen.next();
  const tmpIfTest /*:unknown*/ = tmpForOfNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const tmpCalleeParam$3 /*:object*/ = { a: 1, b: 2 };
    const tmpNestedAssignObjPatternRhs /*:unknown*/ = $(tmpCalleeParam$3);
    a = tmpNestedAssignObjPatternRhs.a;
    const tmpAssignMemRhs /*:unknown*/ = tmpForOfNext.value;
    tmpNestedAssignObjPatternRhs.x = tmpAssignMemRhs;
  }
}
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = 999;
const tmpForOfGen = $forOf($({ x: 1 }));
while (true) {
  const tmpForOfNext = tmpForOfGen.next();
  if (tmpForOfNext.done) {
    break;
  } else {
    const tmpNestedAssignObjPatternRhs = $({ a: 1, b: 2 });
    a = tmpNestedAssignObjPatternRhs.a;
    tmpNestedAssignObjPatternRhs.x = tmpForOfNext.value;
  }
}
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = 999;
const b = { x: 1 };
const c = $( b );
const d = $forOf( c );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const e = d.next();
  const f = e.done;
  if (f) {
    break;
  }
  else {
    const g = {
      a: 1,
      b: 2,
    };
    const h = $( g );
    a = h.a;
    const i = e.value;
    h.x = i;
  }
}
$( a );
`````


## Todos triggered


- Calling a static method on an ident that is not global and not recorded: $tmpForOfGen_next


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
