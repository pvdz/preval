# Preval test case

# auto_ident_bin.md

> Normalize > Expressions > Assignments > While > Auto ident bin
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
while ((a = $(1) + $(2))) $(100);
$(a);
`````


## Settled


`````js filename=intro
const tmpBinBothLhs /*:unknown*/ = $(1);
const tmpBinBothRhs /*:unknown*/ = $(2);
let a /*:primitive*/ = tmpBinBothLhs + tmpBinBothRhs;
if (a) {
  while ($LOOP_UNROLL_10) {
    $(100);
    const tmpBinBothLhs$1 /*:unknown*/ = $(1);
    const tmpBinBothRhs$1 /*:unknown*/ = $(2);
    a = tmpBinBothLhs$1 + tmpBinBothRhs$1;
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
let a = $(1) + $(2);
if (a) {
  while (true) {
    $(100);
    a = $(1) + $(2);
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
const a = $( 1 );
const b = $( 2 );
let c = a + b;
if (c) {
  while ($LOOP_UNROLL_10) {
    $( 100 );
    const d = $( 1 );
    const e = $( 2 );
    c = d + e;
    if (c) {

    }
    else {
      break;
    }
  }
  $( c );
}
else {
  $( c );
}
`````


## Todos triggered


- (todo) do we want to support ObjectExpression as expression statement in free loops?


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 100
 - 4: 1
 - 5: 2
 - 6: 100
 - 7: 1
 - 8: 2
 - 9: 100
 - 10: 1
 - 11: 2
 - 12: 100
 - 13: 1
 - 14: 2
 - 15: 100
 - 16: 1
 - 17: 2
 - 18: 100
 - 19: 1
 - 20: 2
 - 21: 100
 - 22: 1
 - 23: 2
 - 24: 100
 - 25: 1
 - 26: 2
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
