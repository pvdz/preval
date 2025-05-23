# Preval test case

# auto_ident_nested_complex_member_assigns.md

> Normalize > Expressions > Assignments > For of left > Auto ident nested complex member assigns
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 },
  c = 3;

let a = { a: 999, b: 1000 };
for ((a = $(b)[$("x")] = $(b)[$("x")] = $(b)[$("x")] = $(b)[$("x")] = $(b)[
  $("x")
] = $(b)[$("x")] = c).x of $({ x: 1 }));
$(a, b, c);
`````


## Settled


`````js filename=intro
let a /*:unknown*/ = { a: 999, b: 1000 };
const tmpCalleeParam$1 /*:object*/ = { x: 1 };
const tmpCalleeParam /*:unknown*/ = $(tmpCalleeParam$1);
const tmpForOfGen /*:unknown*/ = $forOf(tmpCalleeParam);
const b /*:object*/ = { x: 1 };
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForOfNext /*:unknown*/ = tmpForOfGen();
  const tmpIfTest /*:unknown*/ = tmpForOfNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const tmpNestedAssignComMemberObj /*:unknown*/ = $(b);
    const tmpNestedAssignComMemberProp /*:unknown*/ = $(`x`);
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
    tmpInitAssignLhsComputedObj$7[tmpInitAssignLhsComputedProp$7] = 3;
    tmpInitAssignLhsComputedObj$5[tmpInitAssignLhsComputedProp$5] = 3;
    tmpInitAssignLhsComputedObj$3[tmpInitAssignLhsComputedProp$3] = 3;
    tmpInitAssignLhsComputedObj$1[tmpInitAssignLhsComputedProp$1] = 3;
    tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = 3;
    tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = 3;
    a = 3;
    const tmpAssignMemRhs /*:unknown*/ = tmpForOfNext.value;
    (3).x = tmpAssignMemRhs;
  }
}
$(a, b, 3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpForOfGen = $forOf($({ x: 1 }));
const b = { x: 1 };
while (true) {
  const tmpForOfNext = tmpForOfGen();
  if (tmpForOfNext.done) {
    break;
  } else {
    const tmpNestedAssignComMemberObj = $(b);
    const tmpNestedAssignComMemberProp = $(`x`);
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
    tmpInitAssignLhsComputedObj$7[tmpInitAssignLhsComputedProp$7] = 3;
    tmpInitAssignLhsComputedObj$5[tmpInitAssignLhsComputedProp$5] = 3;
    tmpInitAssignLhsComputedObj$3[tmpInitAssignLhsComputedProp$3] = 3;
    tmpInitAssignLhsComputedObj$1[tmpInitAssignLhsComputedProp$1] = 3;
    tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = 3;
    tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = 3;
    a = 3;
    const tmpAssignMemRhs = tmpForOfNext.value;
    (3).x = tmpAssignMemRhs;
  }
}
$(a, b, 3);
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
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const f = d();
  const g = f.done;
  if (g) {
    break;
  }
  else {
    const h = $( e );
    const i = $( "x" );
    const j = $( e );
    const k = $( "x" );
    const l = $( e );
    const m = $( "x" );
    const n = $( e );
    const o = $( "x" );
    const p = $( e );
    const q = $( "x" );
    const r = $( e );
    const s = $( "x" );
    r[s] = 3;
    p[q] = 3;
    n[o] = 3;
    l[m] = 3;
    j[k] = 3;
    h[i] = 3;
    a = 3;
    const t = f.value;
    3.x = t;
  }
}
$( a, e, 3 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { x: 1 };
let c = 3;
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
    const tmpNestedAssignComMemberObj = $(b);
    const tmpNestedAssignComMemberProp = $(`x`);
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
    const tmpInitAssignLhsComputedRhs$7 = c;
    tmpInitAssignLhsComputedObj$7[tmpInitAssignLhsComputedProp$7] = tmpInitAssignLhsComputedRhs$7;
    const tmpInitAssignLhsComputedRhs$5 = tmpInitAssignLhsComputedRhs$7;
    tmpInitAssignLhsComputedObj$5[tmpInitAssignLhsComputedProp$5] = tmpInitAssignLhsComputedRhs$5;
    const tmpInitAssignLhsComputedRhs$3 = tmpInitAssignLhsComputedRhs$5;
    tmpInitAssignLhsComputedObj$3[tmpInitAssignLhsComputedProp$3] = tmpInitAssignLhsComputedRhs$3;
    const tmpInitAssignLhsComputedRhs$1 = tmpInitAssignLhsComputedRhs$3;
    tmpInitAssignLhsComputedObj$1[tmpInitAssignLhsComputedProp$1] = tmpInitAssignLhsComputedRhs$1;
    const tmpInitAssignLhsComputedRhs = tmpInitAssignLhsComputedRhs$1;
    tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = tmpInitAssignLhsComputedRhs;
    const tmpNestedAssignPropRhs = tmpInitAssignLhsComputedRhs;
    const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
    tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs;
    a = tmpNestedPropAssignRhs;
    const tmpAssignMemLhsObj = a;
    const tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
    const tmpAssignMemRhs = tmpForOfNext.value;
    tmpAssignMemLhsObj$1.x = tmpAssignMemRhs;
  }
}
$(a, b, c);
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
