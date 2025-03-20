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
const x /*:array*/ = [1, 2, 3];
const tmpCalleeParam /*:string*/ = x.join(``);
$(tmpCalleeParam);
const y /*:array*/ = [`a`, ...x, `b`];
$(y);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = [1, 2, 3];
$(x.join(``));
$([`a`, ...x, `b`]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 1, 2, 3 ];
const b = a.join( "" );
$( b );
const c = [ "a", ...a, "b" ];
$( c );
`````


## Todos triggered


- calling $array_join on an array that has other reads, must verify they dont mutate the array first


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
