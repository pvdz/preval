# Preval test case

# auto_ident_nested_complex_member_assigns.md

> Normalize > Expressions > Statement > For in left > Auto ident nested complex member assigns
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { x: 1 },
  c = 3;

let a = { a: 999, b: 1000 };
for (($(b)[$("x")] = $(b)[$("x")] = $(b)[$("x")] = $(b)[$("x")] = $(b)[
  $("x")
] = $(b)[$("x")] = c).x in $({ x: 1 }));
$(a, b, c);
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:object*/ /*truthy*/ = { x: 1 };
const tmpCalleeParam /*:unknown*/ = $(tmpCalleeParam$1);
const tmpForInGenNext /*:unknown*/ = $forIn(tmpCalleeParam);
const b /*:object*/ /*truthy*/ = { x: 1 };
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForInNext /*:unknown*/ = tmpForInGenNext();
  const tmpIfTest /*:unknown*/ = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const tmpInitAssignLhsComputedObj /*:unknown*/ = $(b);
    const tmpInitAssignLhsComputedProp /*:unknown*/ = $(`x`);
    const tmpInitAssignLhsComputedObj$1 /*:unknown*/ = $(b);
    const tmpInitAssignLhsComputedProp$1 /*:unknown*/ = $(`x`);
    const tmpInitAssignLhsComputedObj$3 /*:unknown*/ = $(b);
    const tmpInitAssignLhsComputedProp$3 /*:unknown*/ = $(`x`);
    const tmpInitAssignLhsComputedObj$5 /*:unknown*/ = $(b);
    const tmpInitAssignLhsComputedProp$5 /*:unknown*/ = $(`x`);
    const tmpInitAssignLhsComputedObj$7 /*:unknown*/ = $(b);
    const tmpInitAssignLhsComputedProp$7 /*:unknown*/ = $(`x`);
    const tmpInitAssignLhsComputedObj$9 /*:unknown*/ = $(b);
    const tmpInitAssignLhsComputedProp$9 /*:unknown*/ = $(`x`);
    tmpInitAssignLhsComputedObj$9[tmpInitAssignLhsComputedProp$9] = 3;
    tmpInitAssignLhsComputedObj$7[tmpInitAssignLhsComputedProp$7] = 3;
    tmpInitAssignLhsComputedObj$5[tmpInitAssignLhsComputedProp$5] = 3;
    tmpInitAssignLhsComputedObj$3[tmpInitAssignLhsComputedProp$3] = 3;
    tmpInitAssignLhsComputedObj$1[tmpInitAssignLhsComputedProp$1] = 3;
    tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = 3;
    const tmpAssignMemRhs /*:unknown*/ = tmpForInNext.value;
    (3).x = tmpAssignMemRhs;
  }
}
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
$(a, b, 3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpForInGenNext = $forIn($({ x: 1 }));
const b = { x: 1 };
while (true) {
  const tmpForInNext = tmpForInGenNext();
  if (tmpForInNext.done) {
    break;
  } else {
    const tmpInitAssignLhsComputedObj = $(b);
    const tmpInitAssignLhsComputedProp = $(`x`);
    const tmpInitAssignLhsComputedObj$1 = $(b);
    const tmpInitAssignLhsComputedProp$1 = $(`x`);
    const tmpInitAssignLhsComputedObj$3 = $(b);
    const tmpInitAssignLhsComputedProp$3 = $(`x`);
    const tmpInitAssignLhsComputedObj$5 = $(b);
    const tmpInitAssignLhsComputedProp$5 = $(`x`);
    const tmpInitAssignLhsComputedObj$7 = $(b);
    const tmpInitAssignLhsComputedProp$7 = $(`x`);
    const tmpInitAssignLhsComputedObj$9 = $(b);
    const tmpInitAssignLhsComputedProp$9 = $(`x`);
    tmpInitAssignLhsComputedObj$9[tmpInitAssignLhsComputedProp$9] = 3;
    tmpInitAssignLhsComputedObj$7[tmpInitAssignLhsComputedProp$7] = 3;
    tmpInitAssignLhsComputedObj$5[tmpInitAssignLhsComputedProp$5] = 3;
    tmpInitAssignLhsComputedObj$3[tmpInitAssignLhsComputedProp$3] = 3;
    tmpInitAssignLhsComputedObj$1[tmpInitAssignLhsComputedProp$1] = 3;
    tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = 3;
    const tmpAssignMemRhs = tmpForInNext.value;
    (3).x = tmpAssignMemRhs;
  }
}
$({ a: 999, b: 1000 }, b, 3);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { x: 1 };
const b = $( a );
const c = $forIn( b );
const d = { x: 1 };
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const e = c();
  const f = e.done;
  if (f) {
    break;
  }
  else {
    const g = $( d );
    const h = $( "x" );
    const i = $( d );
    const j = $( "x" );
    const k = $( d );
    const l = $( "x" );
    const m = $( d );
    const n = $( "x" );
    const o = $( d );
    const p = $( "x" );
    const q = $( d );
    const r = $( "x" );
    q[r] = 3;
    o[p] = 3;
    m[n] = 3;
    k[l] = 3;
    i[j] = 3;
    g[h] = 3;
    const s = e.value;
    3.x = s;
  }
}
const t = {
  a: 999,
  b: 1000,
};
$( t, d, 3 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { x: 1 };
let c = 3;
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
    const tmpInitAssignLhsComputedObj = $(b);
    const tmpInitAssignLhsComputedProp = $(`x`);
    const tmpInitAssignLhsComputedObj$1 = $(b);
    const tmpInitAssignLhsComputedProp$1 = $(`x`);
    const tmpInitAssignLhsComputedObj$3 = $(b);
    const tmpInitAssignLhsComputedProp$3 = $(`x`);
    const tmpInitAssignLhsComputedObj$5 = $(b);
    const tmpInitAssignLhsComputedProp$5 = $(`x`);
    const tmpInitAssignLhsComputedObj$7 = $(b);
    const tmpInitAssignLhsComputedProp$7 = $(`x`);
    const tmpInitAssignLhsComputedObj$9 = $(b);
    const tmpInitAssignLhsComputedProp$9 = $(`x`);
    const tmpInitAssignLhsComputedRhs$9 = c;
    tmpInitAssignLhsComputedObj$9[tmpInitAssignLhsComputedProp$9] = tmpInitAssignLhsComputedRhs$9;
    const tmpInitAssignLhsComputedRhs$7 = tmpInitAssignLhsComputedRhs$9;
    tmpInitAssignLhsComputedObj$7[tmpInitAssignLhsComputedProp$7] = tmpInitAssignLhsComputedRhs$7;
    const tmpInitAssignLhsComputedRhs$5 = tmpInitAssignLhsComputedRhs$7;
    tmpInitAssignLhsComputedObj$5[tmpInitAssignLhsComputedProp$5] = tmpInitAssignLhsComputedRhs$5;
    const tmpInitAssignLhsComputedRhs$3 = tmpInitAssignLhsComputedRhs$5;
    tmpInitAssignLhsComputedObj$3[tmpInitAssignLhsComputedProp$3] = tmpInitAssignLhsComputedRhs$3;
    const tmpInitAssignLhsComputedRhs$1 = tmpInitAssignLhsComputedRhs$3;
    tmpInitAssignLhsComputedObj$1[tmpInitAssignLhsComputedProp$1] = tmpInitAssignLhsComputedRhs$1;
    const tmpInitAssignLhsComputedRhs = tmpInitAssignLhsComputedRhs$1;
    tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = tmpInitAssignLhsComputedRhs;
    const tmpAssignMemLhsObj = tmpInitAssignLhsComputedRhs;
    const tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
    const tmpAssignMemRhs = tmpForInNext.value;
    tmpAssignMemLhsObj$1.x = tmpAssignMemRhs;
  }
}
$(a, b, c);
`````


## Todos triggered


- (todo) objects in isFree check
- (todo) trying to assign to a property of a primitive, indication of preval issue?


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: '1' }
 - 2: { x: '1' }
 - 3: 'x'
 - 4: { x: '1' }
 - 5: 'x'
 - 6: { x: '1' }
 - 7: 'x'
 - 8: { x: '1' }
 - 9: 'x'
 - 10: { x: '1' }
 - 11: 'x'
 - 12: { x: '1' }
 - 13: 'x'
 - eval returned: ("<crash[ Cannot create property 'x' on number '3' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
