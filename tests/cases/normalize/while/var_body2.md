# Preval test case

# var_body2.md

> Normalize > While > Var body2
>
> Var as body of a do-while

## Input

`````js filename=intro
while ($(true)) var x = $(10);
$(x);
`````

## Settled


`````js filename=intro
let x /*:unknown*/ = undefined;
const tmpIfTest /*:unknown*/ = $(true);
if (tmpIfTest) {
  while ($LOOP_UNROLL_10) {
    x = $(10);
    const tmpIfTest$1 /*:unknown*/ = $(true);
    if (tmpIfTest$1) {
    } else {
      break;
    }
  }
} else {
}
$(x);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let x = undefined;
if ($(true)) {
  while (true) {
    x = $(10);
    if (!$(true)) {
      break;
    }
  }
}
$(x);
`````

## Pre Normal


`````js filename=intro
let x = undefined;
while ($(true)) x = $(10);
$(x);
`````

## Normalized


`````js filename=intro
let x = undefined;
while (true) {
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    x = $(10);
  } else {
    break;
  }
}
$(x);
`````

## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = $( true );
if (b) {
  while ($LOOP_UNROLL_10) {
    a = $( 10 );
    const c = $( true );
    if (c) {

    }
    else {
      break;
    }
  }
}
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: true
 - 2: 10
 - 3: true
 - 4: 10
 - 5: true
 - 6: 10
 - 7: true
 - 8: 10
 - 9: true
 - 10: 10
 - 11: true
 - 12: 10
 - 13: true
 - 14: 10
 - 15: true
 - 16: 10
 - 17: true
 - 18: 10
 - 19: true
 - 20: 10
 - 21: true
 - 22: 10
 - 23: true
 - 24: 10
 - 25: true
 - 26: 10
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
