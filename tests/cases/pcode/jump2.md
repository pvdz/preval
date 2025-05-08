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


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
