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
const b /*:object*/ = { $: $ };
const tmpCallObj /*:unknown*/ = $(b);
let tmpClusterSSA_a /*:unknown*/ = tmpCallObj.$(1);
if (tmpClusterSSA_a) {
  while ($LOOP_UNROLL_10) {
    $(1);
    const tmpCallObj$1 /*:unknown*/ = $(b);
    tmpClusterSSA_a = tmpCallObj$1.$(1);
    if (tmpClusterSSA_a) {
    } else {
      break;
    }
  }
} else {
}
$(tmpClusterSSA_a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { $: $ };
let tmpClusterSSA_a = $(b).$(1);
if (tmpClusterSSA_a) {
  while (true) {
    $(1);
    tmpClusterSSA_a = $(b).$(1);
    if (!tmpClusterSSA_a) {
      break;
    }
  }
}
$(tmpClusterSSA_a);
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
{
  while ((a = (1, 2, $(b))[`\$`](1))) {
    $(1);
  }
}
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
    $(1);
  } else {
    break;
  }
}
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = { $: $ };
const b = $( a );
let c = b.$( 1 );
if (c) {
  while ($LOOP_UNROLL_10) {
    $( 1 );
    const d = $( a );
    c = d.$( 1 );
    if (c) {

    }
    else {
      break;
    }
  }
}
$( c );
`````

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

Todos triggered:
- objects in isFree check