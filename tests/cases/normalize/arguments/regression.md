# Preval test case

# regression.md

> Normalize > Arguments > Regression
>
> Regression that was leading to a crash due to arguments.length. The outer func was mandatory, as was the param default

## Input

`````js filename=intro
const f = function(x1) {
  let x = undefined;
  if ($) {
    x = {};
  } 
  const g = function() {
    $(arguments.length)
  }
  return g();
}
$(f());
`````


## Settled


`````js filename=intro
$(0);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(0);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 0 );
$( undefined );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
