# Preval test case

# another4.md

> Function self assign closure alias > Another4

## Input

`````js filename=intro
let zzzz = function() {
  debugger;
  a = [1, 2, 3];
  return a;
};
let a;
const x = zzzz;
zzzz() === zzzz();
x() !== x();
x() === zzzz();
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
