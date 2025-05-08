# Preval test case

# auto_ident_call_computed_complex_simple.md

> Normalize > Expressions > Statement > For c > Auto ident call computed complex simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
for (; $(1); $(b)["$"](1));
$(a);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  const b /*:object*/ = { $: $ };
  const tmpMCOO /*:unknown*/ = $(b);
  const tmpMCF /*:unknown*/ = tmpMCOO.$;
  $dotCall(tmpMCF, tmpMCOO, `\$`, 1);
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$1 /*:unknown*/ = $(1);
    if (tmpIfTest$1) {
      const tmpMCOO$1 /*:unknown*/ = $(b);
      const tmpMCF$1 /*:unknown*/ = tmpMCOO$1.$;
      $dotCall(tmpMCF$1, tmpMCOO$1, `\$`, 1);
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
  const tmpMCOO = $(b);
  tmpMCOO.$(1);
  while (true) {
    if ($(1)) {
      const tmpMCOO$1 = $(b);
      tmpMCOO$1.$(1);
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
  const d = c.$;
  $dotCall( d, c, "$", 1 );
  while ($LOOP_UNROLL_10) {
    const e = $( 1 );
    if (e) {
      const f = $( b );
      const g = f.$;
      $dotCall( g, f, "$", 1 );
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
$( h );
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
 - 3: 1
 - 4: 1
 - 5: { $: '"<$>"' }
 - 6: 1
 - 7: 1
 - 8: { $: '"<$>"' }
 - 9: 1
 - 10: 1
 - 11: { $: '"<$>"' }
 - 12: 1
 - 13: 1
 - 14: { $: '"<$>"' }
 - 15: 1
 - 16: 1
 - 17: { $: '"<$>"' }
 - 18: 1
 - 19: 1
 - 20: { $: '"<$>"' }
 - 21: 1
 - 22: 1
 - 23: { $: '"<$>"' }
 - 24: 1
 - 25: 1
 - 26: { $: '"<$>"' }
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
