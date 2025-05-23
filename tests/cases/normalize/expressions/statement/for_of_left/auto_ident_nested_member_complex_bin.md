# Preval test case

# auto_ident_nested_member_complex_bin.md

> Normalize > Expressions > Statement > For of left > Auto ident nested member complex bin
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { x: 1 },
  c = { y: 2 },
  d = 3,
  e = 4;

let a = { a: 999, b: 1000 };
for (($(b)[$("x")] = $(c)[$("y")] = d + e).x of $({ x: 1 }));
$(a, b, c, d, e);
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:object*/ = { x: 1 };
const tmpCalleeParam /*:unknown*/ = $(tmpCalleeParam$1);
const tmpForOfGen /*:unknown*/ = $forOf(tmpCalleeParam);
const b /*:object*/ = { x: 1 };
const c /*:object*/ = { y: 2 };
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForOfNext /*:unknown*/ = tmpForOfGen();
  const tmpIfTest /*:unknown*/ = tmpForOfNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const tmpInitAssignLhsComputedObj /*:unknown*/ = $(b);
    const tmpInitAssignLhsComputedProp /*:unknown*/ = $(`x`);
    const tmpInitAssignLhsComputedObj$1 /*:unknown*/ = $(c);
    const tmpInitAssignLhsComputedProp$1 /*:unknown*/ = $(`y`);
    tmpInitAssignLhsComputedObj$1[tmpInitAssignLhsComputedProp$1] = 7;
    tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = 7;
    const tmpAssignMemRhs /*:unknown*/ = tmpForOfNext.value;
    (7).x = tmpAssignMemRhs;
  }
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a, b, c, 3, 4);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpForOfGen = $forOf($({ x: 1 }));
const b = { x: 1 };
const c = { y: 2 };
while (true) {
  const tmpForOfNext = tmpForOfGen();
  if (tmpForOfNext.done) {
    break;
  } else {
    const tmpInitAssignLhsComputedObj = $(b);
    const tmpInitAssignLhsComputedProp = $(`x`);
    const tmpInitAssignLhsComputedObj$1 = $(c);
    const tmpInitAssignLhsComputedProp$1 = $(`y`);
    tmpInitAssignLhsComputedObj$1[tmpInitAssignLhsComputedProp$1] = 7;
    tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = 7;
    const tmpAssignMemRhs = tmpForOfNext.value;
    (7).x = tmpAssignMemRhs;
  }
}
$({ a: 999, b: 1000 }, b, c, 3, 4);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { x: 1 };
const b = $( a );
const c = $forOf( b );
const d = { x: 1 };
const e = { y: 2 };
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const f = c();
  const g = f.done;
  if (g) {
    break;
  }
  else {
    const h = $( d );
    const i = $( "x" );
    const j = $( e );
    const k = $( "y" );
    j[k] = 7;
    h[i] = 7;
    const l = f.value;
    7.x = l;
  }
}
const m = {
  a: 999,
  b: 1000,
};
$( m, d, e, 3, 4 );
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
const tmpForOfGen = $forOf(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForOfNext = tmpForOfGen();
  const tmpIfTest = tmpForOfNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const tmpInitAssignLhsComputedObj = $(b);
    const tmpInitAssignLhsComputedProp = $(`x`);
    const tmpInitAssignLhsComputedObj$1 = $(c);
    const tmpInitAssignLhsComputedProp$1 = $(`y`);
    const tmpInitAssignLhsComputedRhs$1 = d + e;
    tmpInitAssignLhsComputedObj$1[tmpInitAssignLhsComputedProp$1] = tmpInitAssignLhsComputedRhs$1;
    const tmpInitAssignLhsComputedRhs = tmpInitAssignLhsComputedRhs$1;
    tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = tmpInitAssignLhsComputedRhs;
    const tmpAssignMemLhsObj = tmpInitAssignLhsComputedRhs;
    const tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
    const tmpAssignMemRhs = tmpForOfNext.value;
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
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
