# Preval test case

# array_in_array_method.md

> Array > Spread > Array in array method
>
> Spreading an array into another array that is assigned to a binding

## Input

`````js filename=intro
const x = [1, 2, 3];
$(x.join('')); // This is benign, but splice would not be
const y = ['a', ...x, 'b'];
$(y);
`````


## Settled


`````js filename=intro
$(`123`);
const y /*:array*/ = [`a`, 1, 2, 3, `b`];
$(y);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`123`);
$([`a`, 1, 2, 3, `b`]);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "123" );
const a = [ "a", 1, 2, 3, "b" ];
$( a );
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) arr mutation may be able to inline this method: tmpCallCompVal


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '123'
 - 2: ['a', 1, 2, 3, 'b']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
