# Preval test case

# auto_ident_computed_c-seq_simple_assign_complex_member.md

> Normalize > Expressions > Assignments > While > Auto ident computed c-seq simple assign complex member
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
while ((a = (1, 2, $(b))[$("c")] = $(b)[$("d")])) $(100);
$(a, b);
`````


## Settled


`````js filename=intro
let a /*:unknown*/ = undefined;
const b /*:object*/ = { c: 10, d: 20 };
const tmpNestedAssignComMemberObj /*:unknown*/ = $(b);
const tmpNestedAssignComMemberProp /*:unknown*/ = $(`c`);
const tmpCompObj /*:unknown*/ = $(b);
const tmpCompProp /*:unknown*/ = $(`d`);
const tmpNestedAssignPropRhs /*:unknown*/ = tmpCompObj[tmpCompProp];
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedAssignPropRhs;
if (tmpNestedAssignPropRhs) {
  while ($LOOP_UNROLL_10) {
    $(100);
    const tmpNestedAssignComMemberObj$1 /*:unknown*/ = $(b);
    const tmpNestedAssignComMemberProp$1 /*:unknown*/ = $(`c`);
    const tmpCompObj$1 /*:unknown*/ = $(b);
    const tmpCompProp$1 /*:unknown*/ = $(`d`);
    const tmpNestedAssignPropRhs$1 /*:unknown*/ = tmpCompObj$1[tmpCompProp$1];
    tmpNestedAssignComMemberObj$1[tmpNestedAssignComMemberProp$1] = tmpNestedAssignPropRhs$1;
    a = tmpNestedAssignPropRhs$1;
    if (tmpNestedAssignPropRhs$1) {
    } else {
      break;
    }
  }
  $(a, b);
} else {
  $(tmpNestedAssignPropRhs, b);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = undefined;
const b = { c: 10, d: 20 };
const tmpNestedAssignComMemberObj = $(b);
const tmpNestedAssignComMemberProp = $(`c`);
const tmpCompObj = $(b);
const tmpCompProp = $(`d`);
const tmpNestedAssignPropRhs = tmpCompObj[tmpCompProp];
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedAssignPropRhs;
if (tmpNestedAssignPropRhs) {
  while (true) {
    $(100);
    const tmpNestedAssignComMemberObj$1 = $(b);
    const tmpNestedAssignComMemberProp$1 = $(`c`);
    const tmpCompObj$1 = $(b);
    const tmpCompProp$1 = $(`d`);
    const tmpNestedAssignPropRhs$1 = tmpCompObj$1[tmpCompProp$1];
    tmpNestedAssignComMemberObj$1[tmpNestedAssignComMemberProp$1] = tmpNestedAssignPropRhs$1;
    a = tmpNestedAssignPropRhs$1;
    if (!tmpNestedAssignPropRhs$1) {
      break;
    }
  }
  $(a, b);
} else {
  $(tmpNestedAssignPropRhs, b);
}
`````


## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = {
  c: 10,
  d: 20,
};
const c = $( b );
const d = $( "c" );
const e = $( b );
const f = $( "d" );
const g = e[ f ];
c[d] = g;
if (g) {
  while ($LOOP_UNROLL_10) {
    $( 100 );
    const h = $( b );
    const i = $( "c" );
    const j = $( b );
    const k = $( "d" );
    const l = j[ k ];
    h[i] = l;
    a = l;
    if (l) {

    }
    else {
      break;
    }
  }
  $( a, b );
}
else {
  $( g, b );
}
`````


## Todos triggered


- objects in isFree check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { c: '10', d: '20' }
 - 2: 'c'
 - 3: { c: '10', d: '20' }
 - 4: 'd'
 - 5: 100
 - 6: { c: '20', d: '20' }
 - 7: 'c'
 - 8: { c: '20', d: '20' }
 - 9: 'd'
 - 10: 100
 - 11: { c: '20', d: '20' }
 - 12: 'c'
 - 13: { c: '20', d: '20' }
 - 14: 'd'
 - 15: 100
 - 16: { c: '20', d: '20' }
 - 17: 'c'
 - 18: { c: '20', d: '20' }
 - 19: 'd'
 - 20: 100
 - 21: { c: '20', d: '20' }
 - 22: 'c'
 - 23: { c: '20', d: '20' }
 - 24: 'd'
 - 25: 100
 - 26: { c: '20', d: '20' }
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
