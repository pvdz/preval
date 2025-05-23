# Preval test case

# auto_ident_computed_complex_simple_assign_complex_member.md

> Normalize > Expressions > Assignments > For c > Auto ident computed complex simple assign complex member
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
for (; $(1); a = $(b)["c"] = $(b)[$("d")]);
$(a, b);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
const b /*:object*/ = { c: 10, d: 20 };
if (tmpIfTest) {
  const tmpNestedAssignObj /*:unknown*/ = $(b);
  const tmpCompObj /*:unknown*/ = $(b);
  const tmpCalleeParam /*:unknown*/ = $(`d`);
  const tmpNestedPropAssignRhs /*:unknown*/ = tmpCompObj[tmpCalleeParam];
  tmpNestedAssignObj.c = tmpNestedPropAssignRhs;
  let tmpClusterSSA_a /*:unknown*/ = tmpNestedPropAssignRhs;
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$1 /*:unknown*/ = $(1);
    if (tmpIfTest$1) {
      const tmpNestedAssignObj$1 /*:unknown*/ = $(b);
      const tmpCompObj$1 /*:unknown*/ = $(b);
      const tmpCalleeParam$1 /*:unknown*/ = $(`d`);
      const tmpNestedPropAssignRhs$1 /*:unknown*/ = tmpCompObj$1[tmpCalleeParam$1];
      tmpNestedAssignObj$1.c = tmpNestedPropAssignRhs$1;
      tmpClusterSSA_a = tmpNestedPropAssignRhs$1;
    } else {
      break;
    }
  }
  $(tmpClusterSSA_a, b);
} else {
  const a /*:object*/ = { a: 999, b: 1000 };
  $(a, b);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $(1);
const b = { c: 10, d: 20 };
if (tmpIfTest) {
  const tmpNestedAssignObj = $(b);
  const tmpCompObj = $(b);
  const tmpCalleeParam = $(`d`);
  const tmpNestedPropAssignRhs = tmpCompObj[tmpCalleeParam];
  tmpNestedAssignObj.c = tmpNestedPropAssignRhs;
  let tmpClusterSSA_a = tmpNestedPropAssignRhs;
  while (true) {
    if ($(1)) {
      const tmpNestedAssignObj$1 = $(b);
      const tmpCompObj$1 = $(b);
      const tmpCalleeParam$1 = $(`d`);
      const tmpNestedPropAssignRhs$1 = tmpCompObj$1[tmpCalleeParam$1];
      tmpNestedAssignObj$1.c = tmpNestedPropAssignRhs$1;
      tmpClusterSSA_a = tmpNestedPropAssignRhs$1;
    } else {
      break;
    }
  }
  $(tmpClusterSSA_a, b);
} else {
  $({ a: 999, b: 1000 }, b);
}
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
  let g = f;
  while ($LOOP_UNROLL_10) {
    const h = $( 1 );
    if (h) {
      const i = $( b );
      const j = $( b );
      const k = $( "d" );
      const l = j[ k ];
      i.c = l;
      g = l;
    }
    else {
      break;
    }
  }
  $( g, b );
}
else {
  const m = {
    a: 999,
    b: 1000,
  };
  $( m, b );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
while (true) {
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    const tmpNestedAssignObj = $(b);
    const tmpCompObj = $(b);
    const tmpCalleeParam = $(`d`);
    const tmpNestedAssignPropRhs = tmpCompObj[tmpCalleeParam];
    const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
    tmpNestedAssignObj.c = tmpNestedPropAssignRhs;
    a = tmpNestedPropAssignRhs;
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
