# Preval test case

# bug.md

> Spyless vars > Bug
>
>

## Input

`````js filename=intro
let a = 1; const arr = [a]; a = 2; if ($) $(arr);
`````


## Settled


`````js filename=intro
if ($) {
  const arr /*:array*/ = [1];
  $(arr);
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($) {
  $([1]);
}
`````


## PST Settled
With rename=true

`````js filename=intro
if ($) {
  const a = [ 1 ];
  $( a );
}
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [1]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
