# Preval test case

# empty_try_catch.md

> Try > Empty try catch
>
> If the try is empty then the catch can't trigger and we can safely eliminate it

## Input

`````js filename=intro
let x = 1;
try { }
catch {
  // This block can be dropped safely
  $(x);
  x = 2;
}
finally {
  $(x);
}
$(x);
`````


## Settled


`````js filename=intro
$(1);
$(1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(1);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 1 );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
