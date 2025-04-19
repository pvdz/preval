# Preval test case

# auto_ident_call_computed_complex_complex.md

> Normalize > Expressions > Assignments > Do while > Auto ident call computed complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = $(b)[$("$")](1)));
$(a);
`````


## Settled


`````js filename=intro
let a /*:unknown*/ = undefined;
$(100);
const b /*:object*/ = { $: $ };
const tmpCallCompObj /*:unknown*/ = $(b);
const tmpCallCompProp /*:unknown*/ = $(`\$`);
const tmpCallCompVal /*:unknown*/ = tmpCallCompObj[tmpCallCompProp];
const tmpClusterSSA_a /*:unknown*/ = $dotCall(tmpCallCompVal, tmpCallCompObj, undefined, 1);
if (tmpClusterSSA_a) {
  while ($LOOP_UNROLL_10) {
    $(100);
    const tmpCallCompObj$1 /*:unknown*/ = $(b);
    const tmpCallCompProp$1 /*:unknown*/ = $(`\$`);
    const tmpCallCompVal$1 /*:unknown*/ = tmpCallCompObj$1[tmpCallCompProp$1];
    a = $dotCall(tmpCallCompVal$1, tmpCallCompObj$1, undefined, 1);
    if (a) {
    } else {
      break;
    }
  }
  $(a);
} else {
  $(tmpClusterSSA_a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = undefined;
$(100);
const b = { $: $ };
const tmpCallCompObj = $(b);
const tmpCallCompProp = $(`\$`);
const tmpClusterSSA_a = tmpCallCompObj[tmpCallCompProp](1);
if (tmpClusterSSA_a) {
  while (true) {
    $(100);
    const tmpCallCompObj$1 = $(b);
    const tmpCallCompProp$1 = $(`\$`);
    a = tmpCallCompObj$1[tmpCallCompProp$1](1);
    if (!a) {
      break;
    }
  }
  $(a);
} else {
  $(tmpClusterSSA_a);
}
`````


## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
$( 100 );
const b = { $: $ };
const c = $( b );
const d = $( "$" );
const e = c[ d ];
const f = $dotCall( e, c, undefined, 1 );
if (f) {
  while ($LOOP_UNROLL_10) {
    $( 100 );
    const g = $( b );
    const h = $( "$" );
    const i = g[ h ];
    a = $dotCall( i, g, undefined, 1 );
    if (a) {

    }
    else {
      break;
    }
  }
  $( a );
}
else {
  $( f );
}
`````


## Todos triggered


- (todo) objects in isFree check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: { $: '"<$>"' }
 - 3: '$'
 - 4: 1
 - 5: 100
 - 6: { $: '"<$>"' }
 - 7: '$'
 - 8: 1
 - 9: 100
 - 10: { $: '"<$>"' }
 - 11: '$'
 - 12: 1
 - 13: 100
 - 14: { $: '"<$>"' }
 - 15: '$'
 - 16: 1
 - 17: 100
 - 18: { $: '"<$>"' }
 - 19: '$'
 - 20: 1
 - 21: 100
 - 22: { $: '"<$>"' }
 - 23: '$'
 - 24: 1
 - 25: 100
 - 26: { $: '"<$>"' }
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
