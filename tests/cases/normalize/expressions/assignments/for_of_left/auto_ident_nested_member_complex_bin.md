# Preval test case

# auto_ident_nested_member_complex_bin.md

> Normalize > Expressions > Assignments > For of left > Auto ident nested member complex bin
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 },
  c = { y: 2 },
  d = 3,
  e = 4;

let a = { a: 999, b: 1000 };
for ((a = $(b)[$("x")] = $(c)[$("y")] = d + e).x of $({ x: 1 }));
$(a, b, c, d, e);
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
    varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = 7;
    tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = 7;
    a = 7;
    const tmpAssignMemRhs /*:unknown*/ = tmpForOfNext.value;
    (7).x = tmpAssignMemRhs;
  }
}
$(a, b, c, 3, 4);
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
    varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = 7;
    tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = 7;
    a = 7;
    const tmpAssignMemRhs = tmpForOfNext.value;
    (7).x = tmpAssignMemRhs;
  }
}
$(a, b, c, 3, 4);
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
    k[l] = 7;
    i[j] = 7;
    a = 7;
    const m = g.value;
    7.x = m;
  }
}
$( a, e, f, 3, 4 );
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
