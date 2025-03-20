# Preval test case

# auto_ident_unary_plus_complex.md

> Normalize > Expressions > Assignments > For b > Auto ident unary plus complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (; (a = +$(100)); $(1));
$(a);
`````


## Settled


`````js filename=intro
const tmpUnaryArg /*:unknown*/ = $(100);
let a /*:number*/ = +tmpUnaryArg;
if (a) {
  while ($LOOP_UNROLL_10) {
    $(1);
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
const tmpUnaryArg = $(100);
let a = +tmpUnaryArg;
if (a) {
  while (true) {
    $(1);
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
const a = $( 100 );
let b = +a;
if (b) {
  while ($LOOP_UNROLL_10) {
    $( 1 );
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


- objects in isFree check


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
