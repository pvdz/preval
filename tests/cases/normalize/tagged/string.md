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
const tmpCalleeParam /*:array*/ /*truthy*/ = [`foo`];
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


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = [`foo`];
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement


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
