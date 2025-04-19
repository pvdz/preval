# Preval test case

# auto_ident_call_computed_c-seq_simple.md

> Normalize > Expressions > Assignments > Do while > Auto ident call computed c-seq simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = (1, 2, $(b))["$"](1)));
$(a);
`````


## Settled


`````js filename=intro
let a /*:unknown*/ = undefined;
$(100);
const b /*:object*/ = { $: $ };
const tmpCallObj /*:unknown*/ = $(b);
const tmpCallCompVal /*:unknown*/ = tmpCallObj.$;
const tmpClusterSSA_a /*:unknown*/ = $dotCall(tmpCallCompVal, tmpCallObj, `\$`, 1);
if (tmpClusterSSA_a) {
  while ($LOOP_UNROLL_10) {
    $(100);
    const tmpCallObj$1 /*:unknown*/ = $(b);
    const tmpCallCompVal$1 /*:unknown*/ = tmpCallObj$1.$;
    a = $dotCall(tmpCallCompVal$1, tmpCallObj$1, `\$`, 1);
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
const tmpCallObj = $(b);
const tmpClusterSSA_a = tmpCallObj.$(1);
if (tmpClusterSSA_a) {
  while (true) {
    $(100);
    const tmpCallObj$1 = $(b);
    a = tmpCallObj$1.$(1);
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
const d = c.$;
const e = $dotCall( d, c, "$", 1 );
if (e) {
  while ($LOOP_UNROLL_10) {
    $( 100 );
    const f = $( b );
    const g = f.$;
    a = $dotCall( g, f, "$", 1 );
    if (a) {

    }
    else {
      break;
    }
  }
  $( a );
}
else {
  $( e );
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
 - 3: 1
 - 4: 100
 - 5: { $: '"<$>"' }
 - 6: 1
 - 7: 100
 - 8: { $: '"<$>"' }
 - 9: 1
 - 10: 100
 - 11: { $: '"<$>"' }
 - 12: 1
 - 13: 100
 - 14: { $: '"<$>"' }
 - 15: 1
 - 16: 100
 - 17: { $: '"<$>"' }
 - 18: 1
 - 19: 100
 - 20: { $: '"<$>"' }
 - 21: 1
 - 22: 100
 - 23: { $: '"<$>"' }
 - 24: 1
 - 25: 100
 - 26: { $: '"<$>"' }
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
