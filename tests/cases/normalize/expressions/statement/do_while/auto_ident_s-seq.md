# Preval test case

# auto_ident_s-seq.md

> Normalize > Expressions > Statement > Do while > Auto ident s-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
do {
  $(100);
} while (($(1), $(2), x));
$(a, x);
`````

## Settled


`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(100);
  $(1);
  $(2);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
while (true) {
  $(100);
  $(1);
  $(2);
}
`````

## Pre Normal


`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
while (true) {
  {
    $(100);
  }
  if (($(1), $(2), x)) {
  } else {
    break;
  }
}
$(a, x);
`````

## Normalized


`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
while (true) {
  $(100);
  $(1);
  $(2);
  const tmpIfTest = x;
  if (tmpIfTest) {
  } else {
    break;
  }
}
$(a, x);
`````

## PST Settled
With rename=true

`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( 100 );
  $( 1 );
  $( 2 );
}
`````

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

Todos triggered:
- objects in isFree check