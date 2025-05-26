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
const tmpClusterSSA_a /*:number*/ = +tmpUnaryArg;
if (tmpClusterSSA_a) {
  let a /*:number*/ = 0;
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
  $(tmpClusterSSA_a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpUnaryArg = $(100);
const tmpClusterSSA_a = +tmpUnaryArg;
if (tmpClusterSSA_a) {
  let a = 0;
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
  $(tmpClusterSSA_a);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
const b = +a;
if (b) {
  let c = 0;
  while ($LOOP_UNROLL_10) {
    $( 1 );
    const d = $( 100 );
    c = +d;
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
  a = +tmpUnaryArg;
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


- (todo) do we want to support ObjectExpression as expression statement in free loops?
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
