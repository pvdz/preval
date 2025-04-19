# Preval test case

# auto_ident_call_computed_complex_complex.md

> Normalize > Expressions > Statement > While > Auto ident call computed complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
while ($(b)[$("$")](1)) $(100);
$(a);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { $: $ };
const tmpMCCO /*:unknown*/ = $(b);
const tmpMCCP /*:unknown*/ = $(`\$`);
const tmpMCF /*:unknown*/ = tmpMCCO[tmpMCCP];
const tmpIfTest /*:unknown*/ = $dotCall(tmpMCF, tmpMCCO, undefined, 1);
if (tmpIfTest) {
  while ($LOOP_UNROLL_10) {
    $(100);
    const tmpMCCO$1 /*:unknown*/ = $(b);
    const tmpMCCP$1 /*:unknown*/ = $(`\$`);
    const tmpMCF$1 /*:unknown*/ = tmpMCCO$1[tmpMCCP$1];
    const tmpIfTest$1 /*:unknown*/ = $dotCall(tmpMCF$1, tmpMCCO$1, undefined, 1);
    if (tmpIfTest$1) {
    } else {
      break;
    }
  }
} else {
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { $: $ };
const tmpMCCO = $(b);
const tmpMCCP = $(`\$`);
if (tmpMCCO[tmpMCCP](1)) {
  while (true) {
    $(100);
    const tmpMCCO$1 = $(b);
    const tmpMCCP$1 = $(`\$`);
    if (!tmpMCCO$1[tmpMCCP$1](1)) {
      break;
    }
  }
}
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { $: $ };
const b = $( a );
const c = $( "$" );
const d = b[ c ];
const e = $dotCall( d, b, undefined, 1 );
if (e) {
  while ($LOOP_UNROLL_10) {
    $( 100 );
    const f = $( a );
    const g = $( "$" );
    const h = f[ g ];
    const i = $dotCall( h, f, undefined, 1 );
    if (i) {

    }
    else {
      break;
    }
  }
}
const j = {
  a: 999,
  b: 1000,
};
$( j );
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
