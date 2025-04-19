# Preval test case

# auto_ident_call_computed_c-seq_simple.md

> Normalize > Expressions > Assignments > For b > Auto ident call computed c-seq simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
for (; (a = (1, 2, $(b))["$"](1)); $(1));
$(a);
`````


## Settled


`````js filename=intro
let a /*:unknown*/ = undefined;
const b /*:object*/ = { $: $ };
const tmpMCOO /*:unknown*/ = $(b);
const tmpMCF /*:unknown*/ = tmpMCOO.$;
const tmpClusterSSA_a /*:unknown*/ = $dotCall(tmpMCF, tmpMCOO, `\$`, 1);
if (tmpClusterSSA_a) {
  while ($LOOP_UNROLL_10) {
    $(1);
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
  $(tmpClusterSSA_a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = undefined;
const b = { $: $ };
const tmpMCOO = $(b);
const tmpClusterSSA_a = tmpMCOO.$(1);
if (tmpClusterSSA_a) {
  while (true) {
    $(1);
    const tmpMCOO$1 = $(b);
    a = tmpMCOO$1.$(1);
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
const d = c.$;
const e = $dotCall( d, c, "$", 1 );
if (e) {
  while ($LOOP_UNROLL_10) {
    $( 1 );
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
 - 1: { $: '"<$>"' }
 - 2: 1
 - 3: 1
 - 4: { $: '"<$>"' }
 - 5: 1
 - 6: 1
 - 7: { $: '"<$>"' }
 - 8: 1
 - 9: 1
 - 10: { $: '"<$>"' }
 - 11: 1
 - 12: 1
 - 13: { $: '"<$>"' }
 - 14: 1
 - 15: 1
 - 16: { $: '"<$>"' }
 - 17: 1
 - 18: 1
 - 19: { $: '"<$>"' }
 - 20: 1
 - 21: 1
 - 22: { $: '"<$>"' }
 - 23: 1
 - 24: 1
 - 25: { $: '"<$>"' }
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
