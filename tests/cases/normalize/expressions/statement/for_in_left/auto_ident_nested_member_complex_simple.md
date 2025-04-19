# Preval test case

# auto_ident_nested_member_complex_simple.md

> Normalize > Expressions > Statement > For in left > Auto ident nested member complex simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { x: 1 },
  c = { y: 2 },
  d = 3;

let a = { a: 999, b: 1000 };
for (($(b)[$("x")] = $(c)[$("y")] = d).x in $({ x: 1 }));
$(a, b, c, d);
`````


## Settled


`````js filename=intro
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
    const tmpInitAssignLhsComputedObj /*:unknown*/ = $(b);
    const tmpInitAssignLhsComputedProp /*:unknown*/ = $(`x`);
    const tmpInitAssignLhsComputedObj$1 /*:unknown*/ = $(c);
    const tmpInitAssignLhsComputedProp$1 /*:unknown*/ = $(`y`);
    tmpInitAssignLhsComputedObj$1[tmpInitAssignLhsComputedProp$1] = 3;
    tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = 3;
    const tmpAssignMemRhs /*:unknown*/ = tmpForInNext.value;
    (3).x = tmpAssignMemRhs;
  }
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a, b, c, 3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpForInGenNext = $forIn($({ x: 1 }));
const b = { x: 1 };
const c = { y: 2 };
while (true) {
  const tmpForInNext = tmpForInGenNext();
  if (tmpForInNext.done) {
    break;
  } else {
    const tmpInitAssignLhsComputedObj = $(b);
    const tmpInitAssignLhsComputedProp = $(`x`);
    const tmpInitAssignLhsComputedObj$1 = $(c);
    const tmpInitAssignLhsComputedProp$1 = $(`y`);
    tmpInitAssignLhsComputedObj$1[tmpInitAssignLhsComputedProp$1] = 3;
    tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = 3;
    const tmpAssignMemRhs = tmpForInNext.value;
    (3).x = tmpAssignMemRhs;
  }
}
$({ a: 999, b: 1000 }, b, c, 3);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { x: 1 };
const b = $( a );
const c = $forIn( b );
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
    j[k] = 3;
    h[i] = 3;
    const l = f.value;
    3.x = l;
  }
}
const m = {
  a: 999,
  b: 1000,
};
$( m, d, e, 3 );
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
 - eval returned: ("<crash[ Cannot create property 'x' on number '3' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
