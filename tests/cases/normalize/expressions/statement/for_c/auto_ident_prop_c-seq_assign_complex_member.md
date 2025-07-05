# Preval test case

# auto_ident_prop_c-seq_assign_complex_member.md

> Normalize > Expressions > Statement > For c > Auto ident prop c-seq assign complex member
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
for (; $(1); (1, 2, $(b)).c = $(b)[$("d")]);
$(a, b);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
const b /*:object*/ /*truthy*/ = { c: 10, d: 20 };
if (tmpIfTest) {
  const tmpAssignMemLhsObj$1 /*:unknown*/ = $(b);
  const tmpCompObj /*:unknown*/ = $(b);
  const tmpCalleeParam /*:unknown*/ = $(`d`);
  const tmpAssignMemRhs /*:unknown*/ = tmpCompObj[tmpCalleeParam];
  tmpAssignMemLhsObj$1.c = tmpAssignMemRhs;
  while ($LOOP_UNROLLS_LEFT_10) {
    const tmpIfTest$1 /*:unknown*/ = $(1);
    if (tmpIfTest$1) {
      const tmpAssignMemLhsObj$2 /*:unknown*/ = $(b);
      const tmpCompObj$1 /*:unknown*/ = $(b);
      const tmpCalleeParam$1 /*:unknown*/ = $(`d`);
      const tmpAssignMemRhs$1 /*:unknown*/ = tmpCompObj$1[tmpCalleeParam$1];
      tmpAssignMemLhsObj$2.c = tmpAssignMemRhs$1;
    } else {
      break;
    }
  }
} else {
}
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
$(a, b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $(1);
const b = { c: 10, d: 20 };
if (tmpIfTest) {
  const tmpAssignMemLhsObj$1 = $(b);
  const tmpCompObj = $(b);
  const tmpCalleeParam = $(`d`);
  tmpAssignMemLhsObj$1.c = tmpCompObj[tmpCalleeParam];
  while (true) {
    if ($(1)) {
      const tmpAssignMemLhsObj$2 = $(b);
      const tmpCompObj$1 = $(b);
      const tmpCalleeParam$1 = $(`d`);
      tmpAssignMemLhsObj$2.c = tmpCompObj$1[tmpCalleeParam$1];
    } else {
      break;
    }
  }
}
$({ a: 999, b: 1000 }, b);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = {
  c: 10,
  d: 20,
};
if (a) {
  const c = $( b );
  const d = $( b );
  const e = $( "d" );
  const f = d[ e ];
  c.c = f;
  while ($LOOP_UNROLLS_LEFT_10) {
    const g = $( 1 );
    if (g) {
      const h = $( b );
      const i = $( b );
      const j = $( "d" );
      const k = i[ j ];
      h.c = k;
    }
    else {
      break;
    }
  }
}
const l = {
  a: 999,
  b: 1000,
};
$( l, b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
while (true) {
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    const tmpAssignMemLhsObj = $(b);
    const tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
    const tmpCompObj = $(b);
    const tmpCalleeParam = $(`d`);
    const tmpAssignMemRhs = tmpCompObj[tmpCalleeParam];
    tmpAssignMemLhsObj$1.c = tmpAssignMemRhs;
  } else {
    break;
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
 - 1: 1
 - 2: { c: '10', d: '20' }
 - 3: { c: '10', d: '20' }
 - 4: 'd'
 - 5: 1
 - 6: { c: '20', d: '20' }
 - 7: { c: '20', d: '20' }
 - 8: 'd'
 - 9: 1
 - 10: { c: '20', d: '20' }
 - 11: { c: '20', d: '20' }
 - 12: 'd'
 - 13: 1
 - 14: { c: '20', d: '20' }
 - 15: { c: '20', d: '20' }
 - 16: 'd'
 - 17: 1
 - 18: { c: '20', d: '20' }
 - 19: { c: '20', d: '20' }
 - 20: 'd'
 - 21: 1
 - 22: { c: '20', d: '20' }
 - 23: { c: '20', d: '20' }
 - 24: 'd'
 - 25: 1
 - 26: { c: '20', d: '20' }
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
