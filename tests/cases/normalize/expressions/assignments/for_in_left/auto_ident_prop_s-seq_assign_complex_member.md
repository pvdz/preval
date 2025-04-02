# Preval test case

# auto_ident_prop_s-seq_assign_complex_member.md

> Normalize > Expressions > Assignments > For in left > Auto ident prop s-seq assign complex member
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
for ((a = (1, 2, b).c = $(b)[$("d")]).x in $({ x: 1 }));
$(a, b);
`````


## Settled


`````js filename=intro
let a /*:unknown*/ = { a: 999, b: 1000 };
const tmpCalleeParam$1 /*:object*/ = { x: 1 };
const tmpCalleeParam /*:unknown*/ = $(tmpCalleeParam$1);
const tmpForInGen /*:unknown*/ = $forIn(tmpCalleeParam);
const b /*:object*/ = { c: 10, d: 20 };
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForInNext /*:unknown*/ = tmpForInGen();
  const tmpIfTest /*:unknown*/ = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const tmpCompObj /*:unknown*/ = $(b);
    const tmpCompProp /*:unknown*/ = $(`d`);
    const tmpNestedAssignPropRhs /*:unknown*/ = tmpCompObj[tmpCompProp];
    b.c = tmpNestedAssignPropRhs;
    a = tmpNestedAssignPropRhs;
    const tmpAssignMemRhs /*:unknown*/ = tmpForInNext.value;
    tmpNestedAssignPropRhs.x = tmpAssignMemRhs;
  }
}
$(a, b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpForInGen = $forIn($({ x: 1 }));
const b = { c: 10, d: 20 };
while (true) {
  const tmpForInNext = tmpForInGen();
  if (tmpForInNext.done) {
    break;
  } else {
    const tmpCompObj = $(b);
    const tmpCompProp = $(`d`);
    const tmpNestedAssignPropRhs = tmpCompObj[tmpCompProp];
    b.c = tmpNestedAssignPropRhs;
    a = tmpNestedAssignPropRhs;
    tmpNestedAssignPropRhs.x = tmpForInNext.value;
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
    const i = $( "d" );
    const j = h[ i ];
    e.c = j;
    a = j;
    const k = f.value;
    j.x = k;
  }
}
$( a, e );
`````


## Todos triggered


- (todo) objects in isFree check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: '1' }
 - 2: { c: '10', d: '20' }
 - 3: 'd'
 - eval returned: ("<crash[ Cannot create property 'x' on number '20' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
