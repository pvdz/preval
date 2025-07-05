# Preval test case

# auto_ident_unary_complex.md

> Normalize > Expressions > Assignments > For c > Auto ident unary complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
for (; $(1); a = typeof $(x));
$(a, x);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  const tmpUnaryArg /*:unknown*/ = $(1);
  let tmpClusterSSA_a /*:string*/ /*truthy*/ = typeof tmpUnaryArg;
  while ($LOOP_UNROLLS_LEFT_10) {
    const tmpIfTest$1 /*:unknown*/ = $(1);
    if (tmpIfTest$1) {
      const tmpUnaryArg$1 /*:unknown*/ = $(1);
      tmpClusterSSA_a = typeof tmpUnaryArg$1;
    } else {
      break;
    }
  }
  $(tmpClusterSSA_a, 1);
} else {
  const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
  $(a, 1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1)) {
  const tmpUnaryArg = $(1);
  let tmpClusterSSA_a = typeof tmpUnaryArg;
  while (true) {
    if ($(1)) {
      const tmpUnaryArg$1 = $(1);
      tmpClusterSSA_a = typeof tmpUnaryArg$1;
    } else {
      break;
    }
  }
  $(tmpClusterSSA_a, 1);
} else {
  $({ a: 999, b: 1000 }, 1);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  const b = $( 1 );
  let c = typeof b;
  while ($LOOP_UNROLLS_LEFT_10) {
    const d = $( 1 );
    if (d) {
      const e = $( 1 );
      c = typeof e;
    }
    else {
      break;
    }
  }
  $( c, 1 );
}
else {
  const f = {
    a: 999,
    b: 1000,
  };
  $( f, 1 );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
while (true) {
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    const tmpUnaryArg = $(x);
    a = typeof tmpUnaryArg;
  } else {
    break;
  }
}
$(a, x);
`````


## Todos triggered


- (todo) objects in isFree check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 1
 - 6: 1
 - 7: 1
 - 8: 1
 - 9: 1
 - 10: 1
 - 11: 1
 - 12: 1
 - 13: 1
 - 14: 1
 - 15: 1
 - 16: 1
 - 17: 1
 - 18: 1
 - 19: 1
 - 20: 1
 - 21: 1
 - 22: 1
 - 23: 1
 - 24: 1
 - 25: 1
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
