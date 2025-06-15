# Preval test case

# jump2.md

> Pcode > Jump2

## Input

`````js filename=intro
let pcode = function(a, b) {
  A: {
    if (a) break A;
    return b;
  }
  return a * b;
};
pcode(5, 20);
pcode(19, 38);
`````


## Settled


`````js filename=intro

`````


## Denormalized
(This ought to be the final result)

`````js filename=intro

`````


## PST Settled
With rename=true

`````js filename=intro

`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let pcode = function ($$0, $$1) {
  let a = $$0;
  let b = $$1;
  debugger;
  A: {
    if (a) {
      break A;
    } else {
      return b;
    }
  }
  const tmpReturnArg = a * b;
  return tmpReturnArg;
};
pcode(5, 20);
pcode(19, 38);
`````


## Todos triggered


- (todo) nodeMightMutateNameUntrapped; Which statement are we missing here? BlockStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
