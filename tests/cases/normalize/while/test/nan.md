# Preval test case

# nan.md

> Normalize > While > Test > Nan
>
> Certain test values can be statically determined to be true or false

## Input

`````js filename=intro
while (NaN) {
  $('loop');
}
$('after');
`````


## Settled


`````js filename=intro
$(`after`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`after`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "after" );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'after'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
