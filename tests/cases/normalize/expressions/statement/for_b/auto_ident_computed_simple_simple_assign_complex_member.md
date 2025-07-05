# Preval test case

# auto_ident_computed_simple_simple_assign_complex_member.md

> Normalize > Expressions > Statement > For b > Auto ident computed simple simple assign complex member
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
for (; (b["c"] = $(b)[$("d")]); $(1));
$(a, b);
`````


## Settled


`````js filename=intro
const b /*:object*/ /*truthy*/ = { c: 10, d: 20 };
const tmpCompObj /*:unknown*/ = $(b);
const tmpCalleeParam /*:unknown*/ = $(`d`);
const tmpInitAssignLhsComputedRhs /*:unknown*/ = tmpCompObj[tmpCalleeParam];
b.c = tmpInitAssignLhsComputedRhs;
if (tmpInitAssignLhsComputedRhs) {
  while ($LOOP_UNROLLS_LEFT_10) {
    $(1);
    const tmpCompObj$1 /*:unknown*/ = $(b);
    const tmpCalleeParam$1 /*:unknown*/ = $(`d`);
    const tmpInitAssignLhsComputedRhs$1 /*:unknown*/ = tmpCompObj$1[tmpCalleeParam$1];
    b.c = tmpInitAssignLhsComputedRhs$1;
    if (tmpInitAssignLhsComputedRhs$1) {
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
const b = { c: 10, d: 20 };
const tmpCompObj = $(b);
const tmpCalleeParam = $(`d`);
const tmpInitAssignLhsComputedRhs = tmpCompObj[tmpCalleeParam];
b.c = tmpInitAssignLhsComputedRhs;
if (tmpInitAssignLhsComputedRhs) {
  while (true) {
    $(1);
    const tmpCompObj$1 = $(b);
    const tmpCalleeParam$1 = $(`d`);
    const tmpInitAssignLhsComputedRhs$1 = tmpCompObj$1[tmpCalleeParam$1];
    b.c = tmpInitAssignLhsComputedRhs$1;
    if (!tmpInitAssignLhsComputedRhs$1) {
      break;
    }
  }
}
$({ a: 999, b: 1000 }, b);
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
if (d) {
  while ($LOOP_UNROLLS_LEFT_10) {
    $( 1 );
    const e = $( a );
    const f = $( "d" );
    const g = e[ f ];
    a.c = g;
    if (g) {

    }
    else {
      break;
    }
  }
}
const h = {
  a: 999,
  b: 1000,
};
$( h, a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
while (true) {
  const tmpCompObj = $(b);
  const tmpCalleeParam = $(`d`);
  const tmpInitAssignLhsComputedRhs = tmpCompObj[tmpCalleeParam];
  b.c = tmpInitAssignLhsComputedRhs;
  const tmpIfTest = tmpInitAssignLhsComputedRhs;
  if (tmpIfTest) {
    $(1);
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
 - 1: { c: '10', d: '20' }
 - 2: 'd'
 - 3: 1
 - 4: { c: '20', d: '20' }
 - 5: 'd'
 - 6: 1
 - 7: { c: '20', d: '20' }
 - 8: 'd'
 - 9: 1
 - 10: { c: '20', d: '20' }
 - 11: 'd'
 - 12: 1
 - 13: { c: '20', d: '20' }
 - 14: 'd'
 - 15: 1
 - 16: { c: '20', d: '20' }
 - 17: 'd'
 - 18: 1
 - 19: { c: '20', d: '20' }
 - 20: 'd'
 - 21: 1
 - 22: { c: '20', d: '20' }
 - 23: 'd'
 - 24: 1
 - 25: { c: '20', d: '20' }
 - 26: 'd'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
