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
const x /*:array*/ = [1, 2, 3];
$(x);
const y /*:array*/ = [`a`, ...x, `b`];
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


## Todos triggered


None


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
