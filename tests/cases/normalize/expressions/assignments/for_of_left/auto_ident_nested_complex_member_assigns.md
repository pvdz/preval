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
  const tmpForOfNext /*:unknown*/ = tmpForOfGen.next();
  const tmpIfTest /*:unknown*/ = tmpForOfNext.done;
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
  const tmpForOfNext = tmpForOfGen.next();
  if (tmpForOfNext.done) {
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
    const tmpAssignMemRhs = tmpForOfNext.value;
    (3).x = tmpAssignMemRhs;
  }
}
$(a, b, 3);
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 },
  c = 3;
let a = { a: 999, b: 1000 };
{
  let tmpForOfGen = $forOf($({ x: 1 }));
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    let tmpForOfNext = tmpForOfGen.next();
    if (tmpForOfNext.done) {
      break;
    } else {
      (a = $(b)[$(`x`)] = $(b)[$(`x`)] = $(b)[$(`x`)] = $(b)[$(`x`)] = $(b)[$(`x`)] = $(b)[$(`x`)] = c).x = tmpForOfNext.value;
    }
  }
}
$(a, b, c);
`````

## Normalized


`````js filename=intro
let b = { x: 1 };
let c = 3;
let a = { a: 999, b: 1000 };
const tmpCalleeParam$1 = { x: 1 };
const tmpCalleeParam = $(tmpCalleeParam$1);
let tmpForOfGen = $forOf(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  let tmpForOfNext = tmpForOfGen.next();
  const tmpIfTest = tmpForOfNext.done;
  if (tmpIfTest) {
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
    const varInitAssignLhsComputedRhs$7 = c;
    varInitAssignLhsComputedObj$7[varInitAssignLhsComputedProp$7] = varInitAssignLhsComputedRhs$7;
    const varInitAssignLhsComputedRhs$5 = varInitAssignLhsComputedRhs$7;
    varInitAssignLhsComputedObj$5[varInitAssignLhsComputedProp$5] = varInitAssignLhsComputedRhs$5;
    const varInitAssignLhsComputedRhs$3 = varInitAssignLhsComputedRhs$5;
    varInitAssignLhsComputedObj$3[varInitAssignLhsComputedProp$3] = varInitAssignLhsComputedRhs$3;
    const varInitAssignLhsComputedRhs$1 = varInitAssignLhsComputedRhs$3;
    varInitAssignLhsComputedObj$1[varInitAssignLhsComputedProp$1] = varInitAssignLhsComputedRhs$1;
    const varInitAssignLhsComputedRhs = varInitAssignLhsComputedRhs$1;
    varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
    const tmpNestedAssignPropRhs = varInitAssignLhsComputedRhs;
    const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
    tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs;
    a = tmpNestedPropAssignRhs;
    let tmpAssignMemLhsObj = a;
    const tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
    const tmpAssignMemRhs = tmpForOfNext.value;
    tmpAssignMemLhsObj$1.x = tmpAssignMemRhs;
  }
}
$(a, b, c);
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
  const f = d.next();
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

Todos triggered:
- objects in isFree check
- Calling a static method on an ident that is not global and not recorded: $tmpForOfGen_next
