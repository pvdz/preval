# Preval test case

# auto_ident_nested_member_complex_call.md

> Normalize > Expressions > Assignments > For in left > Auto ident nested member complex call
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 },
  c = { y: 2 },
  d = 3;

let a = { a: 999, b: 1000 };
for ((a = $(b)[$("x")] = $(c)[$("y")] = $(d)).x in $({ x: 1 }));
$(a, b, c, d);
`````


## Settled


`````js filename=intro
let a /*:unknown*/ = { a: 999, b: 1000 };
const tmpCalleeParam$1 /*:object*/ = { x: 1 };
const tmpCalleeParam /*:unknown*/ = $(tmpCalleeParam$1);
const tmpForInGenNext /*:unknown*/ = $forIn(tmpCalleeParam);
const b /*:object*/ = { x: 1 };
const c /*:object*/ = { y: 2 };
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForInNext /*:unknown*/ = tmpForInGenNext();
  const tmpIfTest /*:unknown*/ = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const tmpNestedAssignComMemberObj /*:unknown*/ = $(b);
    const tmpNestedAssignComMemberProp /*:unknown*/ = $(`x`);
    const tmpInitAssignLhsComputedObj /*:unknown*/ = $(c);
    const tmpInitAssignLhsComputedProp /*:unknown*/ = $(`y`);
    const tmpInitAssignLhsComputedRhs /*:unknown*/ = $(3);
    tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = tmpInitAssignLhsComputedRhs;
    tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpInitAssignLhsComputedRhs;
    a = tmpInitAssignLhsComputedRhs;
    const tmpAssignMemRhs /*:unknown*/ = tmpForInNext.value;
    tmpInitAssignLhsComputedRhs.x = tmpAssignMemRhs;
  }
}
$(a, b, c, 3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpForInGenNext = $forIn($({ x: 1 }));
const b = { x: 1 };
const c = { y: 2 };
while (true) {
  const tmpForInNext = tmpForInGenNext();
  if (tmpForInNext.done) {
    break;
  } else {
    const tmpNestedAssignComMemberObj = $(b);
    const tmpNestedAssignComMemberProp = $(`x`);
    const tmpInitAssignLhsComputedObj = $(c);
    const tmpInitAssignLhsComputedProp = $(`y`);
    const tmpInitAssignLhsComputedRhs = $(3);
    tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = tmpInitAssignLhsComputedRhs;
    tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpInitAssignLhsComputedRhs;
    a = tmpInitAssignLhsComputedRhs;
    tmpInitAssignLhsComputedRhs.x = tmpForInNext.value;
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
const d = $forIn( c );
const e = { x: 1 };
const f = { y: 2 };
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const g = d();
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


- (todo) objects in isFree check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: '1' }
 - 2: { x: '1' }
 - 3: 'x'
 - 4: { y: '2' }
 - 5: 'y'
 - 6: 3
 - eval returned: ("<crash[ Cannot create property 'x' on number '3' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
