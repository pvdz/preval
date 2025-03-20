# Preval test case

# auto_ident_computed_c-seq_simple_assign_complex_member.md

> Normalize > Expressions > Statement > Do while > Auto ident computed c-seq simple assign complex member
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
do {
  $(100);
} while (((1, 2, $(b))[$("c")] = $(b)[$("d")]));
$(a, b);
`````


## Settled


`````js filename=intro
$(100);
const b /*:object*/ = { c: 10, d: 20 };
const varInitAssignLhsComputedObj /*:unknown*/ = $(b);
const varInitAssignLhsComputedProp /*:unknown*/ = $(`c`);
const tmpCompObj /*:unknown*/ = $(b);
const tmpCompProp /*:unknown*/ = $(`d`);
const varInitAssignLhsComputedRhs /*:unknown*/ = tmpCompObj[tmpCompProp];
varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
if (varInitAssignLhsComputedRhs) {
  while ($LOOP_UNROLL_10) {
    $(100);
    const varInitAssignLhsComputedObj$1 /*:unknown*/ = $(b);
    const varInitAssignLhsComputedProp$1 /*:unknown*/ = $(`c`);
    const tmpCompObj$1 /*:unknown*/ = $(b);
    const tmpCompProp$1 /*:unknown*/ = $(`d`);
    const varInitAssignLhsComputedRhs$1 /*:unknown*/ = tmpCompObj$1[tmpCompProp$1];
    varInitAssignLhsComputedObj$1[varInitAssignLhsComputedProp$1] = varInitAssignLhsComputedRhs$1;
    if (varInitAssignLhsComputedRhs$1) {
    } else {
      break;
    }
  }
} else {
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a, b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(100);
const b = { c: 10, d: 20 };
const varInitAssignLhsComputedObj = $(b);
const varInitAssignLhsComputedProp = $(`c`);
const tmpCompObj = $(b);
const tmpCompProp = $(`d`);
const varInitAssignLhsComputedRhs = tmpCompObj[tmpCompProp];
varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
if (varInitAssignLhsComputedRhs) {
  while (true) {
    $(100);
    const varInitAssignLhsComputedObj$1 = $(b);
    const varInitAssignLhsComputedProp$1 = $(`c`);
    const tmpCompObj$1 = $(b);
    const tmpCompProp$1 = $(`d`);
    const varInitAssignLhsComputedRhs$1 = tmpCompObj$1[tmpCompProp$1];
    varInitAssignLhsComputedObj$1[varInitAssignLhsComputedProp$1] = varInitAssignLhsComputedRhs$1;
    if (!varInitAssignLhsComputedRhs$1) {
      break;
    }
  }
}
$({ a: 999, b: 1000 }, b);
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
const c = $( "c" );
const d = $( a );
const e = $( "d" );
const f = d[ e ];
b[c] = f;
if (f) {
  while ($LOOP_UNROLL_10) {
    $( 100 );
    const g = $( a );
    const h = $( "c" );
    const i = $( a );
    const j = $( "d" );
    const k = i[ j ];
    g[h] = k;
    if (k) {

    }
    else {
      break;
    }
  }
}
const l = {
  a: 999,
  b: 1000,
};
$( l, a );
`````


## Todos triggered


- objects in isFree check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: { c: '10', d: '20' }
 - 3: 'c'
 - 4: { c: '10', d: '20' }
 - 5: 'd'
 - 6: 100
 - 7: { c: '20', d: '20' }
 - 8: 'c'
 - 9: { c: '20', d: '20' }
 - 10: 'd'
 - 11: 100
 - 12: { c: '20', d: '20' }
 - 13: 'c'
 - 14: { c: '20', d: '20' }
 - 15: 'd'
 - 16: 100
 - 17: { c: '20', d: '20' }
 - 18: 'c'
 - 19: { c: '20', d: '20' }
 - 20: 'd'
 - 21: 100
 - 22: { c: '20', d: '20' }
 - 23: 'c'
 - 24: { c: '20', d: '20' }
 - 25: 'd'
 - 26: 100
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
