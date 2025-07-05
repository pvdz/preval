# Preval test case

# base_rev.md

> Normalize > While > Simplify norm > Base rev
>
> Try to undo some of the damage that was necessary during loop normalizations

## Input

`````js filename=intro
while (true) {
  const tmpIfTest = $();
  if (tmpIfTest) {
    break;
  } else {
  }
}
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $();
if (tmpIfTest) {
} else {
  while ($LOOP_UNROLLS_LEFT_10) {
    const tmpIfTest$1 /*:unknown*/ = $();
    if (tmpIfTest$1) {
      break;
    } else {
    }
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if (!$()) {
  while (true) {
    if ($()) {
      break;
    }
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $();
if (a) {

}
else {
  while ($LOOP_UNROLLS_LEFT_10) {
    const b = $();
    if (b) {
      break;
    }
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
while (true) {
  const tmpIfTest = $();
  if (tmpIfTest) {
    break;
  } else {
  }
}
`````


## Todos triggered


None


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
