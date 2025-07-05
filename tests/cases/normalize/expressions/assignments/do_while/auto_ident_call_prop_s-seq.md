# Preval test case

# auto_ident_call_prop_s-seq.md

> Normalize > Expressions > Assignments > Do while > Auto ident call prop s-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = (1, 2, b).$(1)));
$(a);
`````


## Settled


`````js filename=intro
$(100);
const b /*:object*/ /*truthy*/ = { $: $ };
const tmpClusterSSA_a /*:unknown*/ = $dotCall($, b, `\$`, 1);
if (tmpClusterSSA_a) {
  let a /*:unknown*/ = undefined;
  while ($LOOP_UNROLLS_LEFT_10) {
    $(100);
    const tmpMCF$1 /*:unknown*/ = b.$;
    a = $dotCall(tmpMCF$1, b, `\$`, 1);
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
const tmpClusterSSA_a = $dotCall($, b, `\$`, 1);
if (tmpClusterSSA_a) {
  let a = undefined;
  while (true) {
    $(100);
    a = b.$(1);
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
const b = $dotCall( $, a, "$", 1 );
if (b) {
  let c = undefined;
  while ($LOOP_UNROLLS_LEFT_10) {
    $( 100 );
    const d = a.$;
    c = $dotCall( d, a, "$", 1 );
    if (c) {

    }
    else {
      break;
    }
  }
  $( c );
}
else {
  $( b );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
while (true) {
  $(100);
  const tmpMCOO = b;
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
 - 2: 1
 - 3: 100
 - 4: 1
 - 5: 100
 - 6: 1
 - 7: 100
 - 8: 1
 - 9: 100
 - 10: 1
 - 11: 100
 - 12: 1
 - 13: 100
 - 14: 1
 - 15: 100
 - 16: 1
 - 17: 100
 - 18: 1
 - 19: 100
 - 20: 1
 - 21: 100
 - 22: 1
 - 23: 100
 - 24: 1
 - 25: 100
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
