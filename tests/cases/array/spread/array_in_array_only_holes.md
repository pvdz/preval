# Preval test case

# array_in_array_only_holes.md

> Array > Spread > Array in array only holes
>
> Spreading an array into another array that is assigned to a binding

## Input

`````js filename=intro
const x = [,,,];
const y = ['a', ...x, 'b'];
$(y);
`````


## Settled


`````js filename=intro
const y /*:array*/ /*truthy*/ = [`a`, undefined, undefined, undefined, `b`];
$(y);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$([`a`, undefined, undefined, undefined, `b`]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ "a", undefined, undefined, undefined, "b" ];
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = [, , ,];
const y = [`a`, ...x, `b`];
$(y);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: ['a', undefined, undefined, undefined, 'b']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
