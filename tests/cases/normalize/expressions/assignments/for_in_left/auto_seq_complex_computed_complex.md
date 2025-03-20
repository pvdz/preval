# Preval test case

# auto_seq_complex_computed_complex.md

> Normalize > Expressions > Assignments > For in left > Auto seq complex computed complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for ((a = { b: $(1) }).x in $({ x: 1 }));
($(1), $(a))[$("b")] = $(2);
$(a);
`````


## Settled


`````js filename=intro
let a /*:object*/ = { a: 999, b: 1000 };
const tmpCalleeParam$1 /*:object*/ = { x: 1 };
const tmpCalleeParam /*:unknown*/ = $(tmpCalleeParam$1);
const tmpForInGen /*:unknown*/ = $forIn(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForInNext /*:unknown*/ = tmpForInGen.next();
  const tmpIfTest /*:unknown*/ = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const tmpObjLitVal /*:unknown*/ = $(1);
    a = { b: tmpObjLitVal };
    const tmpAssignMemRhs /*:unknown*/ = tmpForInNext.value;
    a.x = tmpAssignMemRhs;
  }
}
$(1);
const tmpAssignComMemLhsObj /*:unknown*/ = $(a);
const tmpAssignComMemLhsProp /*:unknown*/ = $(`b`);
const tmpAssignComputedRhs /*:unknown*/ = $(2);
tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = tmpAssignComputedRhs;
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpForInGen = $forIn($({ x: 1 }));
while (true) {
  const tmpForInNext = tmpForInGen.next();
  if (tmpForInNext.done) {
    break;
  } else {
    const tmpObjLitVal = $(1);
    a = { b: tmpObjLitVal };
    a.x = tmpForInNext.value;
  }
}
$(1);
const tmpAssignComMemLhsObj = $(a);
const tmpAssignComMemLhsProp = $(`b`);
const tmpAssignComputedRhs = $(2);
tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = tmpAssignComputedRhs;
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = {
  a: 999,
  b: 1000,
};
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
    const g = $( 1 );
    a = { b: g };
    const h = e.value;
    a.x = h;
  }
}
$( 1 );
const i = $( a );
const j = $( "b" );
const k = $( 2 );
i[j] = k;
$( a );
`````


## Todos triggered


- Calling a static method on an ident that is not global and not recorded: $tmpForInGen_next


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: '1' }
 - 2: 1
 - 3: 1
 - 4: { b: '1', x: '"x"' }
 - 5: 'b'
 - 6: 2
 - 7: { b: '2', x: '"x"' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
