# Preval test case

# auto_ident_computed_simple_simple_assign_complex_member.md

> Normalize > Expressions > Assignments > Do while > Auto ident computed simple simple assign complex member
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = b["c"] = $(b)[$("d")]));
$(a, b);
`````


## Settled


`````js filename=intro
$(100);
const b /*:object*/ /*truthy*/ = { c: 10, d: 20 };
const tmpCompObj /*:unknown*/ = $(b);
const tmpCalleeParam /*:unknown*/ = $(`d`);
const tmpNestedPropAssignRhs /*:unknown*/ = tmpCompObj[tmpCalleeParam];
b.c = tmpNestedPropAssignRhs;
if (tmpNestedPropAssignRhs) {
  let a /*:unknown*/ = undefined;
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
  $(tmpNestedPropAssignRhs, b);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(100);
const b = { c: 10, d: 20 };
const tmpCompObj = $(b);
const tmpCalleeParam = $(`d`);
const tmpNestedPropAssignRhs = tmpCompObj[tmpCalleeParam];
b.c = tmpNestedPropAssignRhs;
if (tmpNestedPropAssignRhs) {
  let a = undefined;
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
  $(tmpNestedPropAssignRhs, b);
}
`````


## PST Settled
With rename=true

`````js filename=intro
$( 100 );
const a = {
  c: 10,
  d: 20,
};
const b = $( a );
const c = $( "d" );
const d = b[ c ];
a.c = d;
if (d) {
  let e = undefined;
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
  $( d, a );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
while (true) {
  $(100);
  const tmpCompObj = $(b);
  const tmpCalleeParam = $(`d`);
  const tmpNestedAssignPropRhs = tmpCompObj[tmpCalleeParam];
  const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
  b.c = tmpNestedPropAssignRhs;
  a = tmpNestedPropAssignRhs;
  const tmpIfTest = a;
  if (tmpIfTest) {
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
 - 1: 100
 - 2: { c: '10', d: '20' }
 - 3: 'd'
 - 4: 100
 - 5: { c: '20', d: '20' }
 - 6: 'd'
 - 7: 100
 - 8: { c: '20', d: '20' }
 - 9: 'd'
 - 10: 100
 - 11: { c: '20', d: '20' }
 - 12: 'd'
 - 13: 100
 - 14: { c: '20', d: '20' }
 - 15: 'd'
 - 16: 100
 - 17: { c: '20', d: '20' }
 - 18: 'd'
 - 19: 100
 - 20: { c: '20', d: '20' }
 - 21: 'd'
 - 22: 100
 - 23: { c: '20', d: '20' }
 - 24: 'd'
 - 25: 100
 - 26: { c: '20', d: '20' }
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
