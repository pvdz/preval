# Preval test case

# auto_ident_prop_s-seq_assign_complex_member.md

> Normalize > Expressions > Statement > For in left > Auto ident prop s-seq assign complex member
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
for (((1, 2, b).c = $(b)[$("d")]).x in $({ x: 1 }));
$(a, b);
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:object*/ = { x: 1 };
const tmpCalleeParam /*:unknown*/ = $(tmpCalleeParam$1);
const tmpForInGenNext /*:unknown*/ = $forIn(tmpCalleeParam);
const b /*:object*/ = { c: 10, d: 20 };
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForInNext /*:unknown*/ = tmpForInGenNext();
  const tmpIfTest /*:unknown*/ = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const tmpCompObj /*:unknown*/ = $(b);
    const tmpCalleeParam$3 /*:unknown*/ = $(`d`);
    const tmpInitAssignLhsComputedRhs /*:unknown*/ = tmpCompObj[tmpCalleeParam$3];
    b.c = tmpInitAssignLhsComputedRhs;
    const tmpAssignMemRhs /*:unknown*/ = tmpForInNext.value;
    tmpInitAssignLhsComputedRhs.x = tmpAssignMemRhs;
  }
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a, b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpForInGenNext = $forIn($({ x: 1 }));
const b = { c: 10, d: 20 };
while (true) {
  const tmpForInNext = tmpForInGenNext();
  if (tmpForInNext.done) {
    break;
  } else {
    const tmpCompObj = $(b);
    const tmpCalleeParam$3 = $(`d`);
    const tmpInitAssignLhsComputedRhs = tmpCompObj[tmpCalleeParam$3];
    b.c = tmpInitAssignLhsComputedRhs;
    tmpInitAssignLhsComputedRhs.x = tmpForInNext.value;
  }
}
$({ a: 999, b: 1000 }, b);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { x: 1 };
const b = $( a );
const c = $forIn( b );
const d = {
  c: 10,
  d: 20,
};
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const e = c();
  const f = e.done;
  if (f) {
    break;
  }
  else {
    const g = $( d );
    const h = $( "d" );
    const i = g[ h ];
    d.c = i;
    const j = e.value;
    i.x = j;
  }
}
const k = {
  a: 999,
  b: 1000,
};
$( k, d );
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
