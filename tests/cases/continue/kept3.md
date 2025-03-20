# Preval test case

# kept3.md

> Continue > Kept3
>
> Example of where continue is not eliminated

## Input

`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  let continued = false;
  if ($()) {
    if ($()) {
      
    } else {
      continued = true;
    }
  } else {
    continued = true;
  }
  if (!continued) {
    if ($()) {
      break;
    }
  }
}
`````


## Settled


`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpIfTest /*:unknown*/ = $();
  if (tmpIfTest) {
    const tmpIfTest$1 /*:unknown*/ = $();
    if (tmpIfTest$1) {
      const tmpIfTest$3 /*:unknown*/ = $();
      if (tmpIfTest$3) {
        break;
      } else {
      }
    } else {
    }
  } else {
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
while (true) {
  if ($()) {
    if ($()) {
      if ($()) {
        break;
      }
    }
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const a = $();
  if (a) {
    const b = $();
    if (b) {
      const c = $();
      if (c) {
        break;
      }
    }
  }
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 
 - 2: 
 - 3: 
 - 4: 
 - 5: 
 - 6: 
 - 7: 
 - 8: 
 - 9: 
 - 10: 
 - 11: 
 - 12: 
 - 13: 
 - 14: 
 - 15: 
 - 16: 
 - 17: 
 - 18: 
 - 19: 
 - 20: 
 - 21: 
 - 22: 
 - 23: 
 - 24: 
 - 25: 
 - 26: 
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
