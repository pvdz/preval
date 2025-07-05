# Preval test case

# auto_ident_prop_c-seq_assign_complex_member.md

> Normalize > Expressions > Assignments > Do while > Auto ident prop c-seq assign complex member
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = (1, 2, $(b)).c = $(b)[$("d")]));
$(a, b);
`````


## Settled


`````js filename=intro
$(100);
const b /*:object*/ /*truthy*/ = { c: 10, d: 20 };
const tmpNestedAssignObj /*:unknown*/ = $(b);
const tmpCompObj /*:unknown*/ = $(b);
const tmpCalleeParam /*:unknown*/ = $(`d`);
const tmpNestedPropAssignRhs /*:unknown*/ = tmpCompObj[tmpCalleeParam];
tmpNestedAssignObj.c = tmpNestedPropAssignRhs;
if (tmpNestedPropAssignRhs) {
  let a /*:unknown*/ = undefined;
  while ($LOOP_UNROLLS_LEFT_10) {
    $(100);
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
  $(tmpNestedPropAssignRhs, b);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(100);
const b = { c: 10, d: 20 };
const tmpNestedAssignObj = $(b);
const tmpCompObj = $(b);
const tmpCalleeParam = $(`d`);
const tmpNestedPropAssignRhs = tmpCompObj[tmpCalleeParam];
tmpNestedAssignObj.c = tmpNestedPropAssignRhs;
if (tmpNestedPropAssignRhs) {
  let a = undefined;
  while (true) {
    $(100);
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
const c = $( a );
const d = $( "d" );
const e = c[ d ];
b.c = e;
if (e) {
  let f = undefined;
  while ($LOOP_UNROLLS_LEFT_10) {
    $( 100 );
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
  $( e, a );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
while (true) {
  $(100);
  const tmpNestedAssignObj = $(b);
  const tmpCompObj = $(b);
  const tmpCalleeParam = $(`d`);
  const tmpNestedAssignPropRhs = tmpCompObj[tmpCalleeParam];
  const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
  tmpNestedAssignObj.c = tmpNestedPropAssignRhs;
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
 - 3: { c: '10', d: '20' }
 - 4: 'd'
 - 5: 100
 - 6: { c: '20', d: '20' }
 - 7: { c: '20', d: '20' }
 - 8: 'd'
 - 9: 100
 - 10: { c: '20', d: '20' }
 - 11: { c: '20', d: '20' }
 - 12: 'd'
 - 13: 100
 - 14: { c: '20', d: '20' }
 - 15: { c: '20', d: '20' }
 - 16: 'd'
 - 17: 100
 - 18: { c: '20', d: '20' }
 - 19: { c: '20', d: '20' }
 - 20: 'd'
 - 21: 100
 - 22: { c: '20', d: '20' }
 - 23: { c: '20', d: '20' }
 - 24: 'd'
 - 25: 100
 - 26: { c: '20', d: '20' }
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
