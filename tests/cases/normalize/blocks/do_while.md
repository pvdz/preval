# Preval test case

# do_while.md

> Normalize > Blocks > Do while
>
> Add blocks to sub-statements

## Input

`````js filename=intro
do $(1);
while ($(2));
`````


## Settled


`````js filename=intro
$(1);
const tmpIfTest /*:unknown*/ = $(2);
if (tmpIfTest) {
  while ($LOOP_UNROLL_10) {
    $(1);
    const tmpIfTest$1 /*:unknown*/ = $(2);
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
$(1);
if ($(2)) {
  while (true) {
    $(1);
    if (!$(2)) {
      break;
    }
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
const a = $( 2 );
if (a) {
  while ($LOOP_UNROLL_10) {
    $( 1 );
    const b = $( 2 );
    if (b) {

    }
    else {
      break;
    }
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
while (true) {
  $(1);
  const tmpIfTest = $(2);
  if (tmpIfTest) {
  } else {
    break;
  }
}
`````


## Todos triggered


None


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
