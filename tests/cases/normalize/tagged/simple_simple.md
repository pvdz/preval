# Preval test case

# simple_simple.md

> Normalize > Tagged > Simple simple
>
> A tagged template that has complex elements should be normalized to only contain simple ones

## Input

`````js filename=intro
$`abc ${ 10 } ${ 20 } def`;
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ /*truthy*/ = [`abc `, ` `, ` def`];
$(tmpCalleeParam, 10, 20);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$([`abc `, ` `, ` def`], 10, 20);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ "abc ", " ", " def" ];
$( a, 10, 20 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = [`abc `, ` `, ` def`];
$(tmpCalleeParam, 10, 20);
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: ['abc ', ' ', ' def'], 10, 20
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
