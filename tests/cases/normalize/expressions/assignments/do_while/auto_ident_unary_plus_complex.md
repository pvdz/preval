# Preval test case

# auto_ident_unary_plus_complex.md

> Normalize > Expressions > Assignments > Do while > Auto ident unary plus complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = +$(100)));
$(a);
`````


## Settled


`````js filename=intro
$(100);
const tmpUnaryArg /*:unknown*/ = $(100);
let a /*:number*/ = +tmpUnaryArg;
if (a) {
  while ($LOOP_UNROLL_10) {
    $(100);
    const tmpUnaryArg$1 /*:unknown*/ = $(100);
    a = +tmpUnaryArg$1;
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
const tmpUnaryArg = $(100);
let a = +tmpUnaryArg;
if (a) {
  while (true) {
    $(100);
    const tmpUnaryArg$1 = $(100);
    a = +tmpUnaryArg$1;
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
const a = $( 100 );
let b = +a;
if (b) {
  while ($LOOP_UNROLL_10) {
    $( 100 );
    const c = $( 100 );
    b = +c;
    if (b) {

    }
    else {
      break;
    }
  }
  $( b );
}
else {
  $( b );
}
`````


## Todos triggered


- (todo) do we want to support ObjectExpression as expression statement in free loops?


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
