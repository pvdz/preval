# Preval test case

# auto_ident_computed_s-seq_simple_assign_complex_member.md

> Normalize > Expressions > Statement > For of left > Auto ident computed s-seq simple assign complex member
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
for (((1, 2, b)[$("c")] = $(b)[$("d")]).x of $({ x: 1 }));
$(a, b);
`````

## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:object*/ = { x: 1 };
const tmpCalleeParam /*:unknown*/ = $(tmpCalleeParam$1);
const tmpForOfGen /*:unknown*/ = $forOf(tmpCalleeParam);
const b /*:object*/ = { c: 10, d: 20 };
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForOfNext /*:unknown*/ = tmpForOfGen.next();
  const tmpIfTest /*:unknown*/ = tmpForOfNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const varInitAssignLhsComputedProp /*:unknown*/ = $(`c`);
    const tmpCompObj /*:unknown*/ = $(b);
    const tmpCompProp /*:unknown*/ = $(`d`);
    const varInitAssignLhsComputedRhs /*:unknown*/ = tmpCompObj[tmpCompProp];
    b[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
    const tmpAssignMemRhs /*:unknown*/ = tmpForOfNext.value;
    varInitAssignLhsComputedRhs.x = tmpAssignMemRhs;
  }
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a, b);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpForOfGen = $forOf($({ x: 1 }));
const b = { c: 10, d: 20 };
while (true) {
  const tmpForOfNext = tmpForOfGen.next();
  if (tmpForOfNext.done) {
    break;
  } else {
    const varInitAssignLhsComputedProp = $(`c`);
    const tmpCompObj = $(b);
    const tmpCompProp = $(`d`);
    const varInitAssignLhsComputedRhs = tmpCompObj[tmpCompProp];
    b[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
    varInitAssignLhsComputedRhs.x = tmpForOfNext.value;
  }
}
$({ a: 999, b: 1000 }, b);
`````

## Pre Normal


`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
{
  let tmpForOfGen = $forOf($({ x: 1 }));
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    let tmpForOfNext = tmpForOfGen.next();
    if (tmpForOfNext.done) {
      break;
    } else {
      ((1, 2, b)[$(`c`)] = $(b)[$(`d`)]).x = tmpForOfNext.value;
    }
  }
}
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { c: 10, d: 20 };
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
    const varInitAssignLhsComputedObj = b;
    const varInitAssignLhsComputedProp = $(`c`);
    const tmpCompObj = $(b);
    const tmpCompProp = $(`d`);
    const varInitAssignLhsComputedRhs = tmpCompObj[tmpCompProp];
    varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
    const tmpAssignMemLhsObj = varInitAssignLhsComputedRhs;
    const tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
    const tmpAssignMemRhs = tmpForOfNext.value;
    tmpAssignMemLhsObj$1.x = tmpAssignMemRhs;
  }
}
$(a, b);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = { x: 1 };
const b = $( a );
const c = $forOf( b );
const d = {
  c: 10,
  d: 20,
};
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const e = c.next();
  const f = e.done;
  if (f) {
    break;
  }
  else {
    const g = $( "c" );
    const h = $( d );
    const i = $( "d" );
    const j = h[ i ];
    d[g] = j;
    const k = e.value;
    j.x = k;
  }
}
const l = {
  a: 999,
  b: 1000,
};
$( l, d );
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
