# Preval test case

# auto_ident_computed_s-seq_simple_assign_complex_member.md

> Normalize > Expressions > Assignments > For c > Auto ident computed s-seq simple assign complex member
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
for (; $(1); a = (1, 2, b)[$("c")] = $(b)[$("d")]);
$(a, b);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
const b /*:object*/ = { c: 10, d: 20 };
if (tmpIfTest) {
  const tmpNestedAssignComMemberProp /*:unknown*/ = $(`c`);
  const tmpCompObj /*:unknown*/ = $(b);
  const tmpCompProp /*:unknown*/ = $(`d`);
  const tmpNestedAssignPropRhs /*:unknown*/ = tmpCompObj[tmpCompProp];
  b[tmpNestedAssignComMemberProp] = tmpNestedAssignPropRhs;
  let tmpClusterSSA_a /*:unknown*/ = tmpNestedAssignPropRhs;
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$1 /*:unknown*/ = $(1);
    if (tmpIfTest$1) {
      const tmpNestedAssignComMemberProp$1 /*:unknown*/ = $(`c`);
      const tmpCompObj$1 /*:unknown*/ = $(b);
      const tmpCompProp$1 /*:unknown*/ = $(`d`);
      const tmpNestedAssignPropRhs$1 /*:unknown*/ = tmpCompObj$1[tmpCompProp$1];
      b[tmpNestedAssignComMemberProp$1] = tmpNestedAssignPropRhs$1;
      tmpClusterSSA_a = tmpNestedAssignPropRhs$1;
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
  const tmpNestedAssignComMemberProp = $(`c`);
  const tmpCompObj = $(b);
  const tmpCompProp = $(`d`);
  const tmpNestedAssignPropRhs = tmpCompObj[tmpCompProp];
  b[tmpNestedAssignComMemberProp] = tmpNestedAssignPropRhs;
  let tmpClusterSSA_a = tmpNestedAssignPropRhs;
  while (true) {
    if ($(1)) {
      const tmpNestedAssignComMemberProp$1 = $(`c`);
      const tmpCompObj$1 = $(b);
      const tmpCompProp$1 = $(`d`);
      const tmpNestedAssignPropRhs$1 = tmpCompObj$1[tmpCompProp$1];
      b[tmpNestedAssignComMemberProp$1] = tmpNestedAssignPropRhs$1;
      tmpClusterSSA_a = tmpNestedAssignPropRhs$1;
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
  const c = $( "c" );
  const d = $( b );
  const e = $( "d" );
  const f = d[ e ];
  b[c] = f;
  let g = f;
  while ($LOOP_UNROLL_10) {
    const h = $( 1 );
    if (h) {
      const i = $( "c" );
      const j = $( b );
      const k = $( "d" );
      const l = j[ k ];
      b[i] = l;
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


## Todos triggered


- objects in isFree check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 'c'
 - 3: { c: '10', d: '20' }
 - 4: 'd'
 - 5: 1
 - 6: 'c'
 - 7: { c: '20', d: '20' }
 - 8: 'd'
 - 9: 1
 - 10: 'c'
 - 11: { c: '20', d: '20' }
 - 12: 'd'
 - 13: 1
 - 14: 'c'
 - 15: { c: '20', d: '20' }
 - 16: 'd'
 - 17: 1
 - 18: 'c'
 - 19: { c: '20', d: '20' }
 - 20: 'd'
 - 21: 1
 - 22: 'c'
 - 23: { c: '20', d: '20' }
 - 24: 'd'
 - 25: 1
 - 26: 'c'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
