# Preval test case

# array_in_array_index_update.md

> Array > Spread > Array in array index update
>
> Spreading an array into another array that is assigned to a binding

## Input

`````js filename=intro
const x = [1, 2, 3];
x[1] = 5; // Only changes an element
const y = ['a', ...x, 'b'];
$(y);
`````


## Settled


`````js filename=intro
const y /*:array*/ /*truthy*/ = [`a`, 1, 5, 3, `b`];
$(y);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$([`a`, 1, 5, 3, `b`]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ "a", 1, 5, 3, "b" ];
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = [1, 2, 3];
x[1] = 5;
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
 - 1: ['a', 1, 5, 3, 'b']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
