# Preval test case

# complex.md

> Normalize > Tagged > Complex
>
> A tagged template that has complex elements should be normalized to only contain simple ones

## Input

`````js filename=intro
$`abc ${ 10 } def`;
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ /*truthy*/ = [`abc `, ` def`];
$(tmpCalleeParam, 10);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$([`abc `, ` def`], 10);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ "abc ", " def" ];
$( a, 10 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = [`abc `, ` def`];
$(tmpCalleeParam, 10);
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: ['abc ', ' def'], 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
