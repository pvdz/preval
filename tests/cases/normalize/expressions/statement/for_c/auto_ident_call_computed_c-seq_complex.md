# Preval test case

# auto_ident_call_computed_c-seq_complex.md

> Normalize > Expressions > Statement > For c > Auto ident call computed c-seq complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
for (; $(1); (1, 2, $(b))[$("$")](1));
$(a);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  const b /*:object*/ = { $: $ };
  const tmpMCCO /*:unknown*/ = $(b);
  const tmpMCCP /*:unknown*/ = $(`\$`);
  const tmpMCF /*:unknown*/ = tmpMCCO[tmpMCCP];
  $dotCall(tmpMCF, tmpMCCO, undefined, 1);
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$1 /*:unknown*/ = $(1);
    if (tmpIfTest$1) {
      const tmpMCCO$1 /*:unknown*/ = $(b);
      const tmpMCCP$1 /*:unknown*/ = $(`\$`);
      const tmpMCF$1 /*:unknown*/ = tmpMCCO$1[tmpMCCP$1];
      $dotCall(tmpMCF$1, tmpMCCO$1, undefined, 1);
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
if ($(1)) {
  const b = { $: $ };
  const tmpMCCO = $(b);
  const tmpMCCP = $(`\$`);
  tmpMCCO[tmpMCCP](1);
  while (true) {
    if ($(1)) {
      const tmpMCCO$1 = $(b);
      const tmpMCCP$1 = $(`\$`);
      tmpMCCO$1[tmpMCCP$1](1);
    } else {
      break;
    }
  }
}
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  const b = { $: $ };
  const c = $( b );
  const d = $( "$" );
  const e = c[ d ];
  $dotCall( e, c, undefined, 1 );
  while ($LOOP_UNROLL_10) {
    const f = $( 1 );
    if (f) {
      const g = $( b );
      const h = $( "$" );
      const i = g[ h ];
      $dotCall( i, g, undefined, 1 );
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


- (todo) - at least one of the frfr args was not isFree, bailing
- (todo) objects in isFree check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: { $: '"<$>"' }
 - 3: '$'
 - 4: 1
 - 5: 1
 - 6: { $: '"<$>"' }
 - 7: '$'
 - 8: 1
 - 9: 1
 - 10: { $: '"<$>"' }
 - 11: '$'
 - 12: 1
 - 13: 1
 - 14: { $: '"<$>"' }
 - 15: '$'
 - 16: 1
 - 17: 1
 - 18: { $: '"<$>"' }
 - 19: '$'
 - 20: 1
 - 21: 1
 - 22: { $: '"<$>"' }
 - 23: '$'
 - 24: 1
 - 25: 1
 - 26: { $: '"<$>"' }
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
