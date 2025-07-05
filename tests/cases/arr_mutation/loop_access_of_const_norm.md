# Preval test case

# loop_access_of_const_norm.md

> Arr mutation > Loop access of const norm
>
> Arr access inside the loop should be safe to resolve

## Input

`````js filename=intro
const b = [ 5, 6, 7 ];
while (true) {
  let tmpIfTest = undefined;
  const tmpIfTest$1 = b == null;
  if (tmpIfTest$1) {}
  else {
    tmpIfTest = b[0];
  }
  if (tmpIfTest) {
    $(1);
  } else {
    break;
  }
}
`````


## Settled


`````js filename=intro
while ($LOOP_NO_UNROLLS_LEFT) {
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


## PST Settled
With rename=true

`````js filename=intro
while ($LOOP_NO_UNROLLS_LEFT) {
  $( 1 );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const b = [5, 6, 7];
while (true) {
  let tmpIfTest = undefined;
  const tmpIfTest$1 = b == null;
  if (tmpIfTest$1) {
  } else {
    tmpIfTest = b[0];
  }
  if (tmpIfTest) {
    $(1);
  } else {
    break;
  }
}
`````


## Todos triggered


- (todo) do we want to support ArrayExpression as expression statement in free loops?
- (todo) do we want to support Literal as expression statement in free loops?


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
