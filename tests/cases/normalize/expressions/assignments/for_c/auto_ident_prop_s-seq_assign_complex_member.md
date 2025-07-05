# Preval test case

# auto_ident_prop_s-seq_assign_complex_member.md

> Normalize > Expressions > Assignments > For c > Auto ident prop s-seq assign complex member
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
for (; $(1); a = (1, 2, b).c = $(b)[$("d")]);
$(a, b);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
const b /*:object*/ /*truthy*/ = { c: 10, d: 20 };
if (tmpIfTest) {
  const tmpCompObj /*:unknown*/ = $(b);
  const tmpCalleeParam /*:unknown*/ = $(`d`);
  const tmpNestedPropAssignRhs /*:unknown*/ = tmpCompObj[tmpCalleeParam];
  b.c = tmpNestedPropAssignRhs;
  let tmpClusterSSA_a /*:unknown*/ = tmpNestedPropAssignRhs;
  while ($LOOP_UNROLLS_LEFT_10) {
    const tmpIfTest$1 /*:unknown*/ = $(1);
    if (tmpIfTest$1) {
      const tmpCompObj$1 /*:unknown*/ = $(b);
      const tmpCalleeParam$1 /*:unknown*/ = $(`d`);
      const tmpNestedPropAssignRhs$1 /*:unknown*/ = tmpCompObj$1[tmpCalleeParam$1];
      b.c = tmpNestedPropAssignRhs$1;
      tmpClusterSSA_a = tmpNestedPropAssignRhs$1;
    } else {
      break;
    }
  }
  $(tmpClusterSSA_a, b);
} else {
  const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
  $(a, b);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $(1);
const b = { c: 10, d: 20 };
if (tmpIfTest) {
  const tmpCompObj = $(b);
  const tmpCalleeParam = $(`d`);
  const tmpNestedPropAssignRhs = tmpCompObj[tmpCalleeParam];
  b.c = tmpNestedPropAssignRhs;
  let tmpClusterSSA_a = tmpNestedPropAssignRhs;
  while (true) {
    if ($(1)) {
      const tmpCompObj$1 = $(b);
      const tmpCalleeParam$1 = $(`d`);
      const tmpNestedPropAssignRhs$1 = tmpCompObj$1[tmpCalleeParam$1];
      b.c = tmpNestedPropAssignRhs$1;
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
  const d = $( "d" );
  const e = c[ d ];
  b.c = e;
  let f = e;
  while ($LOOP_UNROLLS_LEFT_10) {
    const g = $( 1 );
    if (g) {
      const h = $( b );
      const i = $( "d" );
      const j = h[ i ];
      b.c = j;
      f = j;
    }
    else {
      break;
    }
  }
  $( f, b );
}
else {
  const k = {
    a: 999,
    b: 1000,
  };
  $( k, b );
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
    const tmpNestedAssignObj = b;
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
 - 3: 'd'
 - 4: 1
 - 5: { c: '20', d: '20' }
 - 6: 'd'
 - 7: 1
 - 8: { c: '20', d: '20' }
 - 9: 'd'
 - 10: 1
 - 11: { c: '20', d: '20' }
 - 12: 'd'
 - 13: 1
 - 14: { c: '20', d: '20' }
 - 15: 'd'
 - 16: 1
 - 17: { c: '20', d: '20' }
 - 18: 'd'
 - 19: 1
 - 20: { c: '20', d: '20' }
 - 21: 'd'
 - 22: 1
 - 23: { c: '20', d: '20' }
 - 24: 'd'
 - 25: 1
 - 26: { c: '20', d: '20' }
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
