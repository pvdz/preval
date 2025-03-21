# Preval test case

# zero.md

> Normalize > While > Test > Zero
>
> Certain test values can be statically determined to be true or false

## Input

`````js filename=intro
while (0) {
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
