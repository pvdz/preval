# Preval test case

# auto_ident_computed_simple_simple_assign_complex_member.md

> Normalize > Expressions > Assignments > While > Auto ident computed simple simple assign complex member
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
while ((a = b["c"] = $(b)[$("d")])) $(100);
$(a, b);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { c: 10, d: 20 };
const tmpCompObj /*:unknown*/ = $(b);
const tmpCalleeParam /*:unknown*/ = $(`d`);
const tmpNestedPropAssignRhs /*:unknown*/ = tmpCompObj[tmpCalleeParam];
b.c = tmpNestedPropAssignRhs;
let a /*:unknown*/ = tmpNestedPropAssignRhs;
if (tmpNestedPropAssignRhs) {
  while ($LOOP_UNROLL_10) {
    $(100);
    const tmpCompObj$1 /*:unknown*/ = $(b);
    const tmpCalleeParam$1 /*:unknown*/ = $(`d`);
    const tmpNestedPropAssignRhs$1 /*:unknown*/ = tmpCompObj$1[tmpCalleeParam$1];
    b.c = tmpNestedPropAssignRhs$1;
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
const tmpCompObj = $(b);
const tmpCalleeParam = $(`d`);
const tmpNestedPropAssignRhs = tmpCompObj[tmpCalleeParam];
b.c = tmpNestedPropAssignRhs;
let a = tmpNestedPropAssignRhs;
if (tmpNestedPropAssignRhs) {
  while (true) {
    $(100);
    const tmpCompObj$1 = $(b);
    const tmpCalleeParam$1 = $(`d`);
    const tmpNestedPropAssignRhs$1 = tmpCompObj$1[tmpCalleeParam$1];
    b.c = tmpNestedPropAssignRhs$1;
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
const c = $( "d" );
const d = b[ c ];
a.c = d;
let e = d;
if (d) {
  while ($LOOP_UNROLL_10) {
    $( 100 );
    const f = $( a );
    const g = $( "d" );
    const h = f[ g ];
    a.c = h;
    e = h;
    if (h) {

    }
    else {
      break;
    }
  }
  $( e, a );
}
else {
  $( e, a );
}
`````


## Todos triggered


- (todo) objects in isFree check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { c: '10', d: '20' }
 - 2: 'd'
 - 3: 100
 - 4: { c: '20', d: '20' }
 - 5: 'd'
 - 6: 100
 - 7: { c: '20', d: '20' }
 - 8: 'd'
 - 9: 100
 - 10: { c: '20', d: '20' }
 - 11: 'd'
 - 12: 100
 - 13: { c: '20', d: '20' }
 - 14: 'd'
 - 15: 100
 - 16: { c: '20', d: '20' }
 - 17: 'd'
 - 18: 100
 - 19: { c: '20', d: '20' }
 - 20: 'd'
 - 21: 100
 - 22: { c: '20', d: '20' }
 - 23: 'd'
 - 24: 100
 - 25: { c: '20', d: '20' }
 - 26: 'd'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
