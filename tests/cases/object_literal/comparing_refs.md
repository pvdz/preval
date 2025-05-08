# Preval test case

# comparing_refs.md

> Object literal > Comparing refs

Comparing object refs when we know they are or aren't the same can be folded to booleans.

## Input

`````js filename=intro
let zzzz = function() {
  debugger;
  a = [1,2,3];
  return a;
};
let a;
const x = zzzz;
$(zzzz() === zzzz());
$(x() !== x());
$(x() === zzzz());
`````


## Settled


`````js filename=intro
$(false);
$(true);
$(false);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(false);
$(true);
$(false);
`````


## PST Settled
With rename=true

`````js filename=intro
$( false );
$( true );
$( false );
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type ReturnStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: false
 - 2: true
 - 3: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
