# Preval test case

# recursion_indirect2.md

> Tofix > recursion indirect2

existing test case

used to be eliminated. now its not. make it go away.

## Input

`````js filename=intro
const f = function () {
  const repeat = function () {
    f();
  };
  
  repeat();
};
// Do not call f(). That did not trigger the path.
// Yes that means this test ends with an empty output. Or should, anyways.
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
