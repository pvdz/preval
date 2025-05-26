# Preval test case

# auto_ident_unary_minus_complex.md

> Normalize > Expressions > Assignments > While > Auto ident unary minus complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
while ((a = -$(100))) $(100);
$(a);
`````


## Settled


`````js filename=intro
const tmpUnaryArg /*:unknown*/ = $(100);
const tmpClusterSSA_a /*:number*/ = -tmpUnaryArg;
if (tmpClusterSSA_a) {
  let a /*:number*/ = 0;
  while ($LOOP_UNROLL_10) {
    $(100);
    const tmpUnaryArg$1 /*:unknown*/ = $(100);
    a = -tmpUnaryArg$1;
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
const tmpUnaryArg = $(100);
const tmpClusterSSA_a = -tmpUnaryArg;
if (tmpClusterSSA_a) {
  let a = 0;
  while (true) {
    $(100);
    const tmpUnaryArg$1 = $(100);
    a = -tmpUnaryArg$1;
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
const a = $( 100 );
const b = -a;
if (b) {
  let c = 0;
  while ($LOOP_UNROLL_10) {
    $( 100 );
    const d = $( 100 );
    c = -d;
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
let a = { a: 999, b: 1000 };
while (true) {
  const tmpUnaryArg = $(100);
  a = -tmpUnaryArg;
  const tmpIfTest = a;
  if (tmpIfTest) {
    $(100);
  } else {
    break;
  }
}
$(a);
`````


## Todos triggered


- (todo) do we want to support ObjectExpression as expression statement in free loops?
- (todo) objects in isFree check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: 100
 - 4: 100
 - 5: 100
 - 6: 100
 - 7: 100
 - 8: 100
 - 9: 100
 - 10: 100
 - 11: 100
 - 12: 100
 - 13: 100
 - 14: 100
 - 15: 100
 - 16: 100
 - 17: 100
 - 18: 100
 - 19: 100
 - 20: 100
 - 21: 100
 - 22: 100
 - 23: 100
 - 24: 100
 - 25: 100
 - 26: 100
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
