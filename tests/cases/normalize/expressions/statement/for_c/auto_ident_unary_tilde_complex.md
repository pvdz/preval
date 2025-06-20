# Preval test case

# auto_ident_unary_tilde_complex.md

> Normalize > Expressions > Statement > For c > Auto ident unary tilde complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (; $(1); ~$(100));
$(a);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  const tmpUnaryArg /*:unknown*/ = $(100);
  +tmpUnaryArg;
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$1 /*:unknown*/ = $(1);
    if (tmpIfTest$1) {
      const tmpUnaryArg$1 /*:unknown*/ = $(100);
      +tmpUnaryArg$1;
    } else {
      break;
    }
  }
} else {
}
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1)) {
  const tmpUnaryArg = $(100);
  +tmpUnaryArg;
  while (true) {
    if ($(1)) {
      const tmpUnaryArg$1 = $(100);
      +tmpUnaryArg$1;
    } else {
      break;
    }
  }
}
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  const b = $( 100 );
  +b;
  while ($LOOP_UNROLL_10) {
    const c = $( 1 );
    if (c) {
      const d = $( 100 );
      +d;
    }
    else {
      break;
    }
  }
}
const e = {
  a: 999,
  b: 1000,
};
$( e );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    const tmpUnaryArg = $(100);
    +tmpUnaryArg;
  } else {
    break;
  }
}
$(a);
`````


## Todos triggered


- (todo) do we want to support UnaryExpression as expression statement in free loops?


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 100
 - 3: 1
 - 4: 100
 - 5: 1
 - 6: 100
 - 7: 1
 - 8: 100
 - 9: 1
 - 10: 100
 - 11: 1
 - 12: 100
 - 13: 1
 - 14: 100
 - 15: 1
 - 16: 100
 - 17: 1
 - 18: 100
 - 19: 1
 - 20: 100
 - 21: 1
 - 22: 100
 - 23: 1
 - 24: 100
 - 25: 1
 - 26: 100
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
