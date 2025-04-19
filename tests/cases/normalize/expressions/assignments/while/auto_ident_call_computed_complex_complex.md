# Preval test case

# auto_ident_call_computed_complex_complex.md

> Normalize > Expressions > Assignments > While > Auto ident call computed complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
while ((a = $(b)[$("$")](1))) $(100);
$(a);
`````


## Settled


`````js filename=intro
let a /*:unknown*/ = undefined;
const b /*:object*/ = { $: $ };
const tmpMCCO /*:unknown*/ = $(b);
const tmpMCCP /*:unknown*/ = $(`\$`);
const tmpMCF /*:unknown*/ = tmpMCCO[tmpMCCP];
const tmpClusterSSA_a /*:unknown*/ = $dotCall(tmpMCF, tmpMCCO, undefined, 1);
if (tmpClusterSSA_a) {
  while ($LOOP_UNROLL_10) {
    $(100);
    const tmpMCCO$1 /*:unknown*/ = $(b);
    const tmpMCCP$1 /*:unknown*/ = $(`\$`);
    const tmpMCF$1 /*:unknown*/ = tmpMCCO$1[tmpMCCP$1];
    a = $dotCall(tmpMCF$1, tmpMCCO$1, undefined, 1);
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
const b = { $: $ };
const tmpMCCO = $(b);
const tmpMCCP = $(`\$`);
const tmpClusterSSA_a = tmpMCCO[tmpMCCP](1);
if (tmpClusterSSA_a) {
  while (true) {
    $(100);
    const tmpMCCO$1 = $(b);
    const tmpMCCP$1 = $(`\$`);
    a = tmpMCCO$1[tmpMCCP$1](1);
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
 - 1: { $: '"<$>"' }
 - 2: '$'
 - 3: 1
 - 4: 100
 - 5: { $: '"<$>"' }
 - 6: '$'
 - 7: 1
 - 8: 100
 - 9: { $: '"<$>"' }
 - 10: '$'
 - 11: 1
 - 12: 100
 - 13: { $: '"<$>"' }
 - 14: '$'
 - 15: 1
 - 16: 100
 - 17: { $: '"<$>"' }
 - 18: '$'
 - 19: 1
 - 20: 100
 - 21: { $: '"<$>"' }
 - 22: '$'
 - 23: 1
 - 24: 100
 - 25: { $: '"<$>"' }
 - 26: '$'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
