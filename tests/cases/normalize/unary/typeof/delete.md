# Preval test case

# delete.md

> Normalize > Unary > Typeof > Delete
>
> Typeof always returns a string

## Input

`````js filename=intro
$(typeof delete $(100).x);
`````


## Settled


`````js filename=intro
const tmpDeleteObj /*:unknown*/ = $(100);
delete tmpDeleteObj.x;
$(`boolean`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpDeleteObj = $(100);
delete tmpDeleteObj.x;
$(`boolean`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
delete a.x;
$( "boolean" );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: 'boolean'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
