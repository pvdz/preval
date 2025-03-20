# Preval test case

# auto_ident_nested_member_complex_call.md

> Normalize > Expressions > Assignments > For of left > Auto ident nested member complex call
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 },
  c = { y: 2 },
  d = 3;

let a = { a: 999, b: 1000 };
for ((a = $(b)[$("x")] = $(c)[$("y")] = $(d)).x of $({ x: 1 }));
$(a, b, c, d);
`````


## Settled


`````js filename=intro
let a /*:unknown*/ = { a: 999, b: 1000 };
const tmpCalleeParam$1 /*:object*/ = { x: 1 };
const tmpCalleeParam /*:unknown*/ = $(tmpCalleeParam$1);
const tmpForOfGen /*:unknown*/ = $forOf(tmpCalleeParam);
const b /*:object*/ = { x: 1 };
const c /*:object*/ = { y: 2 };
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForOfNext /*:unknown*/ = tmpForOfGen.next();
  const tmpIfTest /*:unknown*/ = tmpForOfNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const tmpNestedAssignComMemberObj /*:unknown*/ = $(b);
    const tmpNestedAssignComMemberProp /*:unknown*/ = $(`x`);
    const varInitAssignLhsComputedObj /*:unknown*/ = $(c);
    const varInitAssignLhsComputedProp /*:unknown*/ = $(`y`);
    const varInitAssignLhsComputedRhs /*:unknown*/ = $(3);
    varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
    tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = varInitAssignLhsComputedRhs;
    a = varInitAssignLhsComputedRhs;
    const tmpAssignMemRhs /*:unknown*/ = tmpForOfNext.value;
    varInitAssignLhsComputedRhs.x = tmpAssignMemRhs;
  }
}
$(a, b, c, 3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpForOfGen = $forOf($({ x: 1 }));
const b = { x: 1 };
const c = { y: 2 };
while (true) {
  const tmpForOfNext = tmpForOfGen.next();
  if (tmpForOfNext.done) {
    break;
  } else {
    const tmpNestedAssignComMemberObj = $(b);
    const tmpNestedAssignComMemberProp = $(`x`);
    const varInitAssignLhsComputedObj = $(c);
    const varInitAssignLhsComputedProp = $(`y`);
    const varInitAssignLhsComputedRhs = $(3);
    varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
    tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = varInitAssignLhsComputedRhs;
    a = varInitAssignLhsComputedRhs;
    varInitAssignLhsComputedRhs.x = tmpForOfNext.value;
  }
}
$(a, b, c, 3);
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
const d = $forOf( c );
const e = { x: 1 };
const f = { y: 2 };
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const g = d.next();
  const h = g.done;
  if (h) {
    break;
  }
  else {
    const i = $( e );
    const j = $( "x" );
    const k = $( f );
    const l = $( "y" );
    const m = $( 3 );
    k[l] = m;
    i[j] = m;
    a = m;
    const n = g.value;
    m.x = n;
  }
}
$( a, e, f, 3 );
`````


## Todos triggered


- objects in isFree check
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
