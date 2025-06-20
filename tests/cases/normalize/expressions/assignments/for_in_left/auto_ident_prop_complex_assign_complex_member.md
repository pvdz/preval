# Preval test case

# auto_ident_prop_complex_assign_complex_member.md

> Normalize > Expressions > Assignments > For in left > Auto ident prop complex assign complex member
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
for ((a = $(b).c = $(b)[$("d")]).x in $({ x: 1 }));
$(a, b);
`````


## Settled


`````js filename=intro
let a /*:unknown*/ = { a: 999, b: 1000 };
const tmpCalleeParam$1 /*:object*/ /*truthy*/ = { x: 1 };
const tmpCalleeParam /*:unknown*/ = $(tmpCalleeParam$1);
const tmpForInGenNext /*:unknown*/ = $forIn(tmpCalleeParam);
const b /*:object*/ /*truthy*/ = { c: 10, d: 20 };
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForInNext /*:unknown*/ = tmpForInGenNext();
  const tmpIfTest /*:unknown*/ = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const tmpNestedAssignObj /*:unknown*/ = $(b);
    const tmpCompObj /*:unknown*/ = $(b);
    const tmpCalleeParam$3 /*:unknown*/ = $(`d`);
    const tmpNestedPropAssignRhs /*:unknown*/ = tmpCompObj[tmpCalleeParam$3];
    tmpNestedAssignObj.c = tmpNestedPropAssignRhs;
    a = tmpNestedPropAssignRhs;
    const tmpAssignMemRhs /*:unknown*/ = tmpForInNext.value;
    tmpNestedPropAssignRhs.x = tmpAssignMemRhs;
  }
}
$(a, b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpForInGenNext = $forIn($({ x: 1 }));
const b = { c: 10, d: 20 };
while (true) {
  const tmpForInNext = tmpForInGenNext();
  if (tmpForInNext.done) {
    break;
  } else {
    const tmpNestedAssignObj = $(b);
    const tmpCompObj = $(b);
    const tmpCalleeParam$3 = $(`d`);
    const tmpNestedPropAssignRhs = tmpCompObj[tmpCalleeParam$3];
    tmpNestedAssignObj.c = tmpNestedPropAssignRhs;
    a = tmpNestedPropAssignRhs;
    tmpNestedPropAssignRhs.x = tmpForInNext.value;
  }
}
$(a, b);
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
const e = {
  c: 10,
  d: 20,
};
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const f = d();
  const g = f.done;
  if (g) {
    break;
  }
  else {
    const h = $( e );
    const i = $( e );
    const j = $( "d" );
    const k = i[ j ];
    h.c = k;
    a = k;
    const l = f.value;
    k.x = l;
  }
}
$( a, e );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { c: 10, d: 20 };
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
    const tmpNestedAssignObj = $(b);
    const tmpCompObj = $(b);
    const tmpCalleeParam$3 = $(`d`);
    const tmpNestedAssignPropRhs = tmpCompObj[tmpCalleeParam$3];
    const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
    tmpNestedAssignObj.c = tmpNestedPropAssignRhs;
    a = tmpNestedPropAssignRhs;
    const tmpAssignMemLhsObj = a;
    const tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
    const tmpAssignMemRhs = tmpForInNext.value;
    tmpAssignMemLhsObj$1.x = tmpAssignMemRhs;
  }
}
$(a, b);
`````


## Todos triggered


- (todo) objects in isFree check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: '1' }
 - 2: { c: '10', d: '20' }
 - 3: { c: '10', d: '20' }
 - 4: 'd'
 - eval returned: ("<crash[ Cannot create property 'x' on number '20' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
