# Preval test case

# auto_ident_prop_complex_assign_complex_member.md

> Normalize > Expressions > Assignments > For b > Auto ident prop complex assign complex member
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
for (; (a = $(b).c = $(b)[$("d")]); $(1));
$(a, b);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { c: 10, d: 20 };
const tmpNestedAssignObj /*:unknown*/ = $(b);
const tmpCompObj /*:unknown*/ = $(b);
const tmpCalleeParam /*:unknown*/ = $(`d`);
const tmpNestedPropAssignRhs /*:unknown*/ = tmpCompObj[tmpCalleeParam];
tmpNestedAssignObj.c = tmpNestedPropAssignRhs;
let a /*:unknown*/ = tmpNestedPropAssignRhs;
if (tmpNestedPropAssignRhs) {
  while ($LOOP_UNROLL_10) {
    $(1);
    const tmpNestedAssignObj$1 /*:unknown*/ = $(b);
    const tmpCompObj$1 /*:unknown*/ = $(b);
    const tmpCalleeParam$1 /*:unknown*/ = $(`d`);
    const tmpNestedPropAssignRhs$1 /*:unknown*/ = tmpCompObj$1[tmpCalleeParam$1];
    tmpNestedAssignObj$1.c = tmpNestedPropAssignRhs$1;
    a = tmpNestedPropAssignRhs$1;
    if (tmpNestedPropAssignRhs$1) {
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
const b = { c: 10, d: 20 };
const tmpNestedAssignObj = $(b);
const tmpCompObj = $(b);
const tmpCalleeParam = $(`d`);
const tmpNestedPropAssignRhs = tmpCompObj[tmpCalleeParam];
tmpNestedAssignObj.c = tmpNestedPropAssignRhs;
let a = tmpNestedPropAssignRhs;
if (tmpNestedPropAssignRhs) {
  while (true) {
    $(1);
    const tmpNestedAssignObj$1 = $(b);
    const tmpCompObj$1 = $(b);
    const tmpCalleeParam$1 = $(`d`);
    const tmpNestedPropAssignRhs$1 = tmpCompObj$1[tmpCalleeParam$1];
    tmpNestedAssignObj$1.c = tmpNestedPropAssignRhs$1;
    a = tmpNestedPropAssignRhs$1;
    if (!tmpNestedPropAssignRhs$1) {
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
const a = {
  c: 10,
  d: 20,
};
const b = $( a );
const c = $( a );
const d = $( "d" );
const e = c[ d ];
b.c = e;
let f = e;
if (e) {
  while ($LOOP_UNROLL_10) {
    $( 1 );
    const g = $( a );
    const h = $( a );
    const i = $( "d" );
    const j = h[ i ];
    g.c = j;
    f = j;
    if (j) {

    }
    else {
      break;
    }
  }
  $( f, a );
}
else {
  $( f, a );
}
`````


## Todos triggered


- (todo) objects in isFree check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { c: '10', d: '20' }
 - 2: { c: '10', d: '20' }
 - 3: 'd'
 - 4: 1
 - 5: { c: '20', d: '20' }
 - 6: { c: '20', d: '20' }
 - 7: 'd'
 - 8: 1
 - 9: { c: '20', d: '20' }
 - 10: { c: '20', d: '20' }
 - 11: 'd'
 - 12: 1
 - 13: { c: '20', d: '20' }
 - 14: { c: '20', d: '20' }
 - 15: 'd'
 - 16: 1
 - 17: { c: '20', d: '20' }
 - 18: { c: '20', d: '20' }
 - 19: 'd'
 - 20: 1
 - 21: { c: '20', d: '20' }
 - 22: { c: '20', d: '20' }
 - 23: 'd'
 - 24: 1
 - 25: { c: '20', d: '20' }
 - 26: { c: '20', d: '20' }
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
