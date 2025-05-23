# Preval test case

# auto_ident_call_prop_c-seq.md

> Normalize > Expressions > Assignments > For b > Auto ident call prop c-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
for (; (a = (1, 2, $(b)).$(1)); $(1));
$(a);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { $: $ };
const tmpMCOO /*:unknown*/ = $(b);
const tmpMCF /*:unknown*/ = tmpMCOO.$;
let a /*:unknown*/ = $dotCall(tmpMCF, tmpMCOO, `\$`, 1);
if (a) {
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
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { $: $ };
const tmpMCOO = $(b);
let a = tmpMCOO.$(1);
if (a) {
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
  $(a);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { $: $ };
const b = $( a );
const c = b.$;
let d = $dotCall( c, b, "$", 1 );
if (d) {
  while ($LOOP_UNROLL_10) {
    $( 1 );
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


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
while (true) {
  const tmpMCOO = $(b);
  const tmpMCF = tmpMCOO.$;
  a = $dotCall(tmpMCF, tmpMCOO, `\$`, 1);
  const tmpIfTest = a;
  if (tmpIfTest) {
    $(1);
  } else {
    break;
  }
}
$(a);
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
