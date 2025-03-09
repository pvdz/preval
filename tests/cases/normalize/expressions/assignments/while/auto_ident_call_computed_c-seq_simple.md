# Preval test case

# auto_ident_call_computed_c-seq_simple.md

> Normalize > Expressions > Assignments > While > Auto ident call computed c-seq simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
while ((a = (1, 2, $(b))["$"](1))) $(100);
$(a);
`````

## Settled


`````js filename=intro
let a /*:unknown*/ = undefined;
const b /*:object*/ = { $: $ };
const tmpCallObj /*:unknown*/ = $(b);
const tmpClusterSSA_a /*:unknown*/ = tmpCallObj.$(1);
if (tmpClusterSSA_a) {
  while ($LOOP_UNROLL_10) {
    $(100);
    const tmpCallObj$1 /*:unknown*/ = $(b);
    a = tmpCallObj$1.$(1);
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
const tmpClusterSSA_a = $(b).$(1);
if (tmpClusterSSA_a) {
  while (true) {
    $(100);
    a = $(b).$(1);
    if (!a) {
      break;
    }
  }
  $(a);
} else {
  $(tmpClusterSSA_a);
}
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
while ((a = (1, 2, $(b))[`\$`](1))) $(100);
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
while (true) {
  const tmpCallObj = $(b);
  a = tmpCallObj.$(1);
  let tmpIfTest = a;
  if (tmpIfTest) {
    $(100);
  } else {
    break;
  }
}
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = { $: $ };
const c = $( b );
const d = c.$( 1 );
if (d) {
  while ($LOOP_UNROLL_10) {
    $( 100 );
    const e = $( b );
    a = e.$( 1 );
    if (a) {

    }
    else {
      break;
    }
  }
  $( a );
}
else {
  $( d );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { $: '"<$>"' }
 - 2: 1
 - 3: 100
 - 4: { $: '"<$>"' }
 - 5: 1
 - 6: 100
 - 7: { $: '"<$>"' }
 - 8: 1
 - 9: 100
 - 10: { $: '"<$>"' }
 - 11: 1
 - 12: 100
 - 13: { $: '"<$>"' }
 - 14: 1
 - 15: 100
 - 16: { $: '"<$>"' }
 - 17: 1
 - 18: 100
 - 19: { $: '"<$>"' }
 - 20: 1
 - 21: 100
 - 22: { $: '"<$>"' }
 - 23: 1
 - 24: 100
 - 25: { $: '"<$>"' }
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- objects in isFree check