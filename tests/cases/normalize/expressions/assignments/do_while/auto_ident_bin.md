# Preval test case

# auto_ident_bin.md

> Normalize > Expressions > Assignments > Do while > Auto ident bin
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = $(1) + $(2)));
$(a);
`````


## Settled


`````js filename=intro
$(100);
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
$(100);
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
$( 100 );
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


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  $(100);
  const tmpBinBothLhs = $(1);
  const tmpBinBothRhs = $(2);
  a = tmpBinBothLhs + tmpBinBothRhs;
  const tmpIfTest = a;
  if (tmpIfTest) {
  } else {
    break;
  }
}
$(a);
`````


## Todos triggered


- (todo) do we want to support ObjectExpression as expression statement in free loops?


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: 1
 - 3: 2
 - 4: 100
 - 5: 1
 - 6: 2
 - 7: 100
 - 8: 1
 - 9: 2
 - 10: 100
 - 11: 1
 - 12: 2
 - 13: 100
 - 14: 1
 - 15: 2
 - 16: 100
 - 17: 1
 - 18: 2
 - 19: 100
 - 20: 1
 - 21: 2
 - 22: 100
 - 23: 1
 - 24: 2
 - 25: 100
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
