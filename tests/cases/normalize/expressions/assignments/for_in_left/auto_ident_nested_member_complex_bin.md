# Preval test case

# auto_ident_nested_member_complex_bin.md

> Normalize > Expressions > Assignments > For in left > Auto ident nested member complex bin
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 },
  c = { y: 2 },
  d = 3,
  e = 4;

let a = { a: 999, b: 1000 };
for ((a = $(b)[$("x")] = $(c)[$("y")] = d + e).x in $({ x: 1 }));
$(a, b, c, d, e);
`````


## Settled


`````js filename=intro
let a /*:unknown*/ /*truthy*/ = { a: 999, b: 1000 };
const tmpCalleeParam$1 /*:object*/ /*truthy*/ = { x: 1 };
const tmpCalleeParam /*:unknown*/ = $(tmpCalleeParam$1);
const tmpForInGenNext /*:unknown*/ = $forIn(tmpCalleeParam);
const b /*:object*/ /*truthy*/ = { x: 1 };
const c /*:object*/ /*truthy*/ = { y: 2 };
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
    tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = 7;
    tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = 7;
    a = 7;
    const tmpAssignMemRhs /*:unknown*/ = tmpForInNext.value;
    (7).x = tmpAssignMemRhs;
  }
}
$(a, b, c, 3, 4);
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
    tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = 7;
    tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = 7;
    a = 7;
    const tmpAssignMemRhs = tmpForInNext.value;
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
    k[l] = 7;
    i[j] = 7;
    a = 7;
    const m = g.value;
    7.x = m;
  }
}
$( a, e, f, 3, 4 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { x: 1 };
let c = { y: 2 };
let d = 3;
let e = 4;
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
    const tmpNestedAssignComMemberObj = $(b);
    const tmpNestedAssignComMemberProp = $(`x`);
    const tmpInitAssignLhsComputedObj = $(c);
    const tmpInitAssignLhsComputedProp = $(`y`);
    const tmpInitAssignLhsComputedRhs = d + e;
    tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = tmpInitAssignLhsComputedRhs;
    const tmpNestedAssignPropRhs = tmpInitAssignLhsComputedRhs;
    const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
    tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs;
    a = tmpNestedPropAssignRhs;
    const tmpAssignMemLhsObj = a;
    const tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
    const tmpAssignMemRhs = tmpForInNext.value;
    tmpAssignMemLhsObj$1.x = tmpAssignMemRhs;
  }
}
$(a, b, c, d, e);
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
 - eval returned: ("<crash[ Cannot create property 'x' on number '7' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
