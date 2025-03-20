# Preval test case

# string.md

> Normalize > Tagged > String
>
> A tagged template that is just a string

## Input

`````js filename=intro
$`foo`;
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ = [`foo`];
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$([`foo`]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ "foo" ];
$( a );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: ['foo']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
