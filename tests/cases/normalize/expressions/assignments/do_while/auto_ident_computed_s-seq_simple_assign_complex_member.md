# Preval test case

# auto_ident_computed_s-seq_simple_assign_complex_member.md

> Normalize > Expressions > Assignments > Do while > Auto ident computed s-seq simple assign complex member
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = (1, 2, b)[$("c")] = $(b)[$("d")]));
$(a, b);
`````


## Settled


`````js filename=intro
$(100);
const tmpNestedAssignComMemberProp /*:unknown*/ = $(`c`);
const b /*:object*/ = { c: 10, d: 20 };
const tmpCompObj /*:unknown*/ = $(b);
const tmpCalleeParam /*:unknown*/ = $(`d`);
const tmpNestedAssignPropRhs /*:unknown*/ = tmpCompObj[tmpCalleeParam];
b[tmpNestedAssignComMemberProp] = tmpNestedAssignPropRhs;
let a /*:unknown*/ = tmpNestedAssignPropRhs;
if (tmpNestedAssignPropRhs) {
  while ($LOOP_UNROLL_10) {
    $(100);
    const tmpNestedAssignComMemberProp$1 /*:unknown*/ = $(`c`);
    const tmpCompObj$1 /*:unknown*/ = $(b);
    const tmpCalleeParam$1 /*:unknown*/ = $(`d`);
    const tmpNestedAssignPropRhs$1 /*:unknown*/ = tmpCompObj$1[tmpCalleeParam$1];
    b[tmpNestedAssignComMemberProp$1] = tmpNestedAssignPropRhs$1;
    a = tmpNestedAssignPropRhs$1;
    if (tmpNestedAssignPropRhs$1) {
    } else {
      break;
    }
  }
  $(a, b);
} else {
  $(a, b);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(100);
const tmpNestedAssignComMemberProp = $(`c`);
const b = { c: 10, d: 20 };
const tmpCompObj = $(b);
const tmpCalleeParam = $(`d`);
const tmpNestedAssignPropRhs = tmpCompObj[tmpCalleeParam];
b[tmpNestedAssignComMemberProp] = tmpNestedAssignPropRhs;
let a = tmpNestedAssignPropRhs;
if (tmpNestedAssignPropRhs) {
  while (true) {
    $(100);
    const tmpNestedAssignComMemberProp$1 = $(`c`);
    const tmpCompObj$1 = $(b);
    const tmpCalleeParam$1 = $(`d`);
    const tmpNestedAssignPropRhs$1 = tmpCompObj$1[tmpCalleeParam$1];
    b[tmpNestedAssignComMemberProp$1] = tmpNestedAssignPropRhs$1;
    a = tmpNestedAssignPropRhs$1;
    if (!tmpNestedAssignPropRhs$1) {
      break;
    }
  }
  $(a, b);
} else {
  $(a, b);
}
`````


## PST Settled
With rename=true

`````js filename=intro
$( 100 );
const a = $( "c" );
const b = {
  c: 10,
  d: 20,
};
const c = $( b );
const d = $( "d" );
const e = c[ d ];
b[a] = e;
let f = e;
if (e) {
  while ($LOOP_UNROLL_10) {
    $( 100 );
    const g = $( "c" );
    const h = $( b );
    const i = $( "d" );
    const j = h[ i ];
    b[g] = j;
    f = j;
    if (j) {

    }
    else {
      break;
    }
  }
  $( f, b );
}
else {
  $( f, b );
}
`````


## Todos triggered


- (todo) objects in isFree check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: 'c'
 - 3: { c: '10', d: '20' }
 - 4: 'd'
 - 5: 100
 - 6: 'c'
 - 7: { c: '20', d: '20' }
 - 8: 'd'
 - 9: 100
 - 10: 'c'
 - 11: { c: '20', d: '20' }
 - 12: 'd'
 - 13: 100
 - 14: 'c'
 - 15: { c: '20', d: '20' }
 - 16: 'd'
 - 17: 100
 - 18: 'c'
 - 19: { c: '20', d: '20' }
 - 20: 'd'
 - 21: 100
 - 22: 'c'
 - 23: { c: '20', d: '20' }
 - 24: 'd'
 - 25: 100
 - 26: 'c'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
