# Preval test case

# string_arr.md

> Normalize > Spread > String arr
>
> Literal operations can be extrapolated and reduced

## Input

`````js filename=intro
const x = [..."hello"];
$(x);
`````


## Settled


`````js filename=intro
const x /*:array*/ /*truthy*/ = [`h`, `e`, `l`, `l`, `o`];
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$([`h`, `e`, `l`, `l`, `o`]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ "h", "e", "l", "l", "o" ];
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = [`h`, `e`, `l`, `l`, `o`];
$(x);
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: ['h', 'e', 'l', 'l', 'o']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
