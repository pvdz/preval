# Preval test case

# while.md

> Normalize > Blocks > While
>
> Add blocks to sub-statements

## Input

`````js filename=intro
while ($(1)) $(2);
`````

## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  while ($LOOP_UNROLL_10) {
    $(2);
    const tmpIfTest$1 /*:unknown*/ = $(1);
    if (tmpIfTest$1) {
    } else {
      break;
    }
  }
} else {
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1)) {
  while (true) {
    $(2);
    if (!$(1)) {
      break;
    }
  }
}
`````

## Pre Normal


`````js filename=intro
while ($(1)) $(2);
`````

## Normalized


`````js filename=intro
while (true) {
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    $(2);
  } else {
    break;
  }
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  while ($LOOP_UNROLL_10) {
    $( 2 );
    const b = $( 1 );
    if (b) {

    }
    else {
      break;
    }
  }
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1
 - 4: 2
 - 5: 1
 - 6: 2
 - 7: 1
 - 8: 2
 - 9: 1
 - 10: 2
 - 11: 1
 - 12: 2
 - 13: 1
 - 14: 2
 - 15: 1
 - 16: 2
 - 17: 1
 - 18: 2
 - 19: 1
 - 20: 2
 - 21: 1
 - 22: 2
 - 23: 1
 - 24: 2
 - 25: 1
 - 26: 2
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
