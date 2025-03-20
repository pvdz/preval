# Preval test case

# for_regular.md

> Normalize > Blocks > For regular
>
> Add blocks to sub-statements

## Input

`````js filename=intro
for ($(1); $(2); $(3)) $(4);
`````


## Settled


`````js filename=intro
$(1);
const tmpIfTest /*:unknown*/ = $(2);
if (tmpIfTest) {
  while ($LOOP_UNROLL_10) {
    $(4);
    $(3);
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
    $(4);
    $(3);
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
    $( 4 );
    $( 3 );
    const b = $( 2 );
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
 - 3: 4
 - 4: 3
 - 5: 2
 - 6: 4
 - 7: 3
 - 8: 2
 - 9: 4
 - 10: 3
 - 11: 2
 - 12: 4
 - 13: 3
 - 14: 2
 - 15: 4
 - 16: 3
 - 17: 2
 - 18: 4
 - 19: 3
 - 20: 2
 - 21: 4
 - 22: 3
 - 23: 2
 - 24: 4
 - 25: 3
 - 26: 2
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
