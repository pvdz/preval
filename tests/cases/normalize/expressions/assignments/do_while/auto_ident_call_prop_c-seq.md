# Preval test case

# auto_ident_call_prop_c-seq.md

> Normalize > Expressions > Assignments > Do while > Auto ident call prop c-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = (1, 2, $(b)).$(1)));
$(a);
`````


## Settled


`````js filename=intro
$(100);
const b /*:object*/ /*truthy*/ = { $: $ };
const tmpMCOO /*:unknown*/ = $(b);
const tmpMCF /*:unknown*/ = tmpMCOO.$;
const tmpClusterSSA_a /*:unknown*/ = $dotCall(tmpMCF, tmpMCOO, `\$`, 1);
if (tmpClusterSSA_a) {
  let a /*:unknown*/ = undefined;
  while ($LOOP_UNROLLS_LEFT_10) {
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
  $(tmpClusterSSA_a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(100);
const b = { $: $ };
const tmpMCOO = $(b);
const tmpClusterSSA_a = tmpMCOO.$(1);
if (tmpClusterSSA_a) {
  let a = undefined;
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
  $(tmpClusterSSA_a);
}
`````


## PST Settled
With rename=true

`````js filename=intro
$( 100 );
const a = { $: $ };
const b = $( a );
const c = b.$;
const d = $dotCall( c, b, "$", 1 );
if (d) {
  let e = undefined;
  while ($LOOP_UNROLLS_LEFT_10) {
    $( 100 );
    const f = $( a );
    const g = f.$;
    e = $dotCall( g, f, "$", 1 );
    if (e) {

    }
    else {
      break;
    }
  }
  $( e );
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
  $(100);
  const tmpMCOO = $(b);
  const tmpMCF = tmpMCOO.$;
  a = $dotCall(tmpMCF, tmpMCOO, `\$`, 1);
  const tmpIfTest = a;
  if (tmpIfTest) {
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
