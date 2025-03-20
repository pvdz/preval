# Preval test case

# simple_simple.md

> Normalize > Templates > Simple simple
>
> A template that has complex elements should be normalized to only contain simple ones

## Input

`````js filename=intro
$(`abc ${ 10 } ${ 20 } def`);
`````


## Settled


`````js filename=intro
$(`abc 10 20 def`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`abc 10 20 def`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "abc 10 20 def" );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'abc 10 20 def'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
