# Preval test case

# kept2.md

> Continue > Kept2
>
> Example of where continue is not eliminated

## Input

`````js filename=intro
exit: while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  again: while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    if ($()) {
      if ($()) {
        break again;
      }
    }
    if ($()) {
      break exit;
    }
  }
}
`````


## Settled


`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  nestedLoop: {
    const tmpIfTest /*:unknown*/ = $();
    if (tmpIfTest) {
      const tmpIfTest$1 /*:unknown*/ = $();
      if (tmpIfTest$1) {
        break nestedLoop;
      } else {
      }
    } else {
    }
    const tmpIfTest$3 /*:unknown*/ = $();
    if (tmpIfTest$3) {
      break;
    } else {
    }
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
while (true) {
  nestedLoop: {
    if ($()) {
      if ($()) {
        break nestedLoop;
      }
    }
    if ($()) {
      break;
    }
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  nestedLoop: {
    const a = $();
    if (a) {
      const b = $();
      if (b) {
        break nestedLoop;
      }
    }
    const c = $();
    if (c) {
      break;
    }
  }
}
`````


## Todos triggered


- (todo) Support this node type in isFree: LabeledStatement


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
