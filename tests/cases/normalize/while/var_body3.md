# Preval test case

# var_body3.md

> Normalize > While > Var body3
>
> Var as body of a do-while

## Input

`````js filename=intro
while ($(true)) var x;
$(x);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(true);
if (tmpIfTest) {
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$1 /*:unknown*/ = $(true);
    if (tmpIfTest$1) {
    } else {
      break;
    }
  }
  $(undefined);
} else {
  $(undefined);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(true)) {
  while (true) {
    if (!$(true)) {
      break;
    }
  }
  $(undefined);
} else {
  $(undefined);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  while ($LOOP_UNROLL_10) {
    const b = $( true );
    if (b) {

    }
    else {
      break;
    }
  }
  $( undefined );
}
else {
  $( undefined );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: true
 - 3: true
 - 4: true
 - 5: true
 - 6: true
 - 7: true
 - 8: true
 - 9: true
 - 10: true
 - 11: true
 - 12: true
 - 13: true
 - 14: true
 - 15: true
 - 16: true
 - 17: true
 - 18: true
 - 19: true
 - 20: true
 - 21: true
 - 22: true
 - 23: true
 - 24: true
 - 25: true
 - 26: true
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
