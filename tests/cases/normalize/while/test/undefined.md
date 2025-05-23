# Preval test case

# undefined.md

> Normalize > While > Test > Undefined
>
> Certain test values can be statically determined to be true or false

## Input

`````js filename=intro
while (undefined) {
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


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
$(`after`);
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
