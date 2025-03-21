# Preval test case

# _base.md

> Normalize > While > Base
>
> A while is a while

## Input

`````js filename=intro
let x = true;
while (x) {
  $('inside');
  x = false;
}
$(1);
`````


## Settled


`````js filename=intro
$(`inside`);
$(1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`inside`);
$(1);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "inside" );
$( 1 );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'inside'
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
