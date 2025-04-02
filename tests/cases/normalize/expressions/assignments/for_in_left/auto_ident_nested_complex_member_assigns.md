# Preval test case

# auto_ident_nested_complex_member_assigns.md

> Normalize > Expressions > Assignments > For in left > Auto ident nested complex member assigns
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 },
  c = 3;

let a = { a: 999, b: 1000 };
for ((a = $(b)[$("x")] = $(b)[$("x")] = $(b)[$("x")] = $(b)[$("x")] = $(b)[
  $("x")
] = $(b)[$("x")] = c).x in $({ x: 1 }));
$(a, b, c);
`````


## Settled


`````js filename=intro
let a /*:unknown*/ = { a: 999, b: 1000 };
const tmpCalleeParam$1 /*:object*/ = { x: 1 };
const tmpCalleeParam /*:unknown*/ = $(tmpCalleeParam$1);
const tmpForInGen /*:unknown*/ = $forIn(tmpCalleeParam);
const b /*:object*/ = { x: 1 };
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForInNext /*:unknown*/ = tmpForInGen();
  const tmpIfTest /*:unknown*/ = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const tmpNestedAssignComMemberObj /*:unknown*/ = $(b);
    const tmpNestedAssignComMemberProp /*:unknown*/ = $(`x`);
    const varInitAssignLhsComputedObj /*:unknown*/ = $(b);
    const varInitAssignLhsComputedProp /*:unknown*/ = $(`x`);
    const varInitAssignLhsComputedObj$1 /*:unknown*/ = $(b);
    const varInitAssignLhsComputedProp$1 /*:unknown*/ = $(`x`);
    const varInitAssignLhsComputedObj$3 /*:unknown*/ = $(b);
    const varInitAssignLhsComputedProp$3 /*:unknown*/ = $(`x`);
    const varInitAssignLhsComputedObj$5 /*:unknown*/ = $(b);
    const varInitAssignLhsComputedProp$5 /*:unknown*/ = $(`x`);
    const varInitAssignLhsComputedObj$7 /*:unknown*/ = $(b);
    const varInitAssignLhsComputedProp$7 /*:unknown*/ = $(`x`);
    varInitAssignLhsComputedObj$7[varInitAssignLhsComputedProp$7] = 3;
    varInitAssignLhsComputedObj$5[varInitAssignLhsComputedProp$5] = 3;
    varInitAssignLhsComputedObj$3[varInitAssignLhsComputedProp$3] = 3;
    varInitAssignLhsComputedObj$1[varInitAssignLhsComputedProp$1] = 3;
    varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = 3;
    tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = 3;
    a = 3;
    const tmpAssignMemRhs /*:unknown*/ = tmpForInNext.value;
    (3).x = tmpAssignMemRhs;
  }
}
$(a, b, 3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpForInGen = $forIn($({ x: 1 }));
const b = { x: 1 };
while (true) {
  const tmpForInNext = tmpForInGen();
  if (tmpForInNext.done) {
    break;
  } else {
    const tmpNestedAssignComMemberObj = $(b);
    const tmpNestedAssignComMemberProp = $(`x`);
    const varInitAssignLhsComputedObj = $(b);
    const varInitAssignLhsComputedProp = $(`x`);
    const varInitAssignLhsComputedObj$1 = $(b);
    const varInitAssignLhsComputedProp$1 = $(`x`);
    const varInitAssignLhsComputedObj$3 = $(b);
    const varInitAssignLhsComputedProp$3 = $(`x`);
    const varInitAssignLhsComputedObj$5 = $(b);
    const varInitAssignLhsComputedProp$5 = $(`x`);
    const varInitAssignLhsComputedObj$7 = $(b);
    const varInitAssignLhsComputedProp$7 = $(`x`);
    varInitAssignLhsComputedObj$7[varInitAssignLhsComputedProp$7] = 3;
    varInitAssignLhsComputedObj$5[varInitAssignLhsComputedProp$5] = 3;
    varInitAssignLhsComputedObj$3[varInitAssignLhsComputedProp$3] = 3;
    varInitAssignLhsComputedObj$1[varInitAssignLhsComputedProp$1] = 3;
    varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = 3;
    tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = 3;
    a = 3;
    const tmpAssignMemRhs = tmpForInNext.value;
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
const d = $forIn( c );
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


## Todos triggered


- (todo) objects in isFree check


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
