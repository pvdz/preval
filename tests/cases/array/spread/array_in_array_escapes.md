# Preval test case

# array_in_array_escapes.md

> Array > Spread > Array in array escapes
>
> Spreading an array into another array that is assigned to a binding

## Input

`````js filename=intro
const x = [1, 2, 3];
$(x); // Cannot predict what happens to x
const y = ['a', ...x, 'b'];
$(y);
`````


## Settled


`````js filename=intro
const x /*:array*/ /*truthy*/ = [1, 2, 3];
$(x);
const y /*:array*/ /*truthy*/ = [`a`, ...x, `b`];
$(y);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = [1, 2, 3];
$(x);
$([`a`, ...x, `b`]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 1, 2, 3 ];
$( a );
const b = [ "a", ...a, "b" ];
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = [1, 2, 3];
$(x);
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
 - 1: [1, 2, 3]
 - 2: ['a', 1, 2, 3, 'b']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
