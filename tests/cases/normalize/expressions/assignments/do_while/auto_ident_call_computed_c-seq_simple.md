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
$(100);
const b /*:object*/ = { $: $ };
const tmpMCOO /*:unknown*/ = $(b);
const tmpMCF /*:unknown*/ = tmpMCOO.$;
let a /*:unknown*/ = $dotCall(tmpMCF, tmpMCOO, `\$`, 1);
if (a) {
  while ($LOOP_UNROLL_10) {
    $(100);
    const tmpMCOO$1 /*:unknown*/ = $(b);
    const tmpMCF$1 /*:unknown*/ = tmpMCOO$1.$;
    a = $dotCall(tmpMCF$1, tmpMCOO$1, `\$`, 1);
    if (a) {
    } else {
      break;
    }
  }
  $(a);
} else {
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(100);
const b = { $: $ };
const tmpMCOO = $(b);
let a = tmpMCOO.$(1);
if (a) {
  while (true) {
    $(100);
    const tmpMCOO$1 = $(b);
    a = tmpMCOO$1.$(1);
    if (!a) {
      break;
    }
  }
  $(a);
} else {
  $(a);
}
`````


## PST Settled
With rename=true

`````js filename=intro
$( 100 );
const a = { $: $ };
const b = $( a );
const c = b.$;
let d = $dotCall( c, b, "$", 1 );
if (d) {
  while ($LOOP_UNROLL_10) {
    $( 100 );
    const e = $( a );
    const f = e.$;
    d = $dotCall( f, e, "$", 1 );
    if (d) {

    }
    else {
      break;
    }
  }
  $( d );
}
else {
  $( d );
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
