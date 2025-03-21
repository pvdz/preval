# Preval test case

# complex.md

> Normalize > Templates > Complex
>
> A template that has complex elements should be normalized to only contain simple ones

## Input

`````js filename=intro
$(`abc ${ 10 } def`);
`````


## Settled


`````js filename=intro
$(`abc 10 def`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`abc 10 def`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "abc 10 def" );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'abc 10 def'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
