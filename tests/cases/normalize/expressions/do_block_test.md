# Preval test case

# do_block_test.md

> Normalize > Expressions > Do block test
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
let a = 1, b = 2, x = 3, y = 4;
do { $(a); b; } while (x + y);
`````

## Settled


`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(1);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
while (true) {
  $(1);
}
`````

## Pre Normal


`````js filename=intro
let a = 1,
  b = 2,
  x = 3,
  y = 4;
while (true) {
  {
    $(a);
    null;
  }
  if (x + y) {
  } else {
    break;
  }
}
`````

## Normalized


`````js filename=intro
let a = 1;
let b = 2;
let x = 3;
let y = 4;
while (true) {
  $(a);
  const tmpIfTest = x + y;
  if (tmpIfTest) {
  } else {
    break;
  }
}
`````

## PST Settled
With rename=true

`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( 1 );
}
`````

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
