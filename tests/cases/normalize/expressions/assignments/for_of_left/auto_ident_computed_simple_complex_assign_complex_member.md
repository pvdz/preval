# Preval test case

# auto_ident_computed_simple_complex_assign_complex_member.md

> Normalize > Expressions > Assignments > For of left > Auto ident computed simple complex assign complex member
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
for ((a = b[$("c")] = $(b)[$("d")]).x of $({ x: 1 }));
$(a, b);
`````


## Settled


`````js filename=intro
let a /*:unknown*/ = { a: 999, b: 1000 };
const tmpCalleeParam$1 /*:object*/ = { x: 1 };
const tmpCalleeParam /*:unknown*/ = $(tmpCalleeParam$1);
const tmpForOfGen /*:unknown*/ = $forOf(tmpCalleeParam);
const b /*:object*/ = { c: 10, d: 20 };
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForOfNext /*:unknown*/ = tmpForOfGen();
  const tmpIfTest /*:unknown*/ = tmpForOfNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const tmpNestedAssignComMemberProp /*:unknown*/ = $(`c`);
    const tmpCompObj /*:unknown*/ = $(b);
    const tmpCalleeParam$3 /*:unknown*/ = $(`d`);
    const tmpNestedPropAssignRhs /*:unknown*/ = tmpCompObj[tmpCalleeParam$3];
    b[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs;
    a = tmpNestedPropAssignRhs;
    const tmpAssignMemRhs /*:unknown*/ = tmpForOfNext.value;
    tmpNestedPropAssignRhs.x = tmpAssignMemRhs;
  }
}
$(a, b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpForOfGen = $forOf($({ x: 1 }));
const b = { c: 10, d: 20 };
while (true) {
  const tmpForOfNext = tmpForOfGen();
  if (tmpForOfNext.done) {
    break;
  } else {
    const tmpNestedAssignComMemberProp = $(`c`);
    const tmpCompObj = $(b);
    const tmpCalleeParam$3 = $(`d`);
    const tmpNestedPropAssignRhs = tmpCompObj[tmpCalleeParam$3];
    b[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs;
    a = tmpNestedPropAssignRhs;
    tmpNestedPropAssignRhs.x = tmpForOfNext.value;
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
const d = $forOf( c );
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
    const h = $( "c" );
    const i = $( e );
    const j = $( "d" );
    const k = i[ j ];
    e[h] = k;
    a = k;
    const l = f.value;
    k.x = l;
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
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
