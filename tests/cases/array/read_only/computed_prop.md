# Preval test case

# computed_prop.md

> Array > Read only > Computed prop
>
> As computed prop. Of itself. Should not trigger the arrrr case.

## Input

`````js filename=intro
const arr = [1, , 3, 4];
$(arr[1]);
$(arr[arr]);
$(`${arr[2]}xyz`);
`````


## Settled


`````js filename=intro
$(undefined);
const arr /*:array*/ = [1, , 3, 4];
const tmpCalleeParam$1 /*:unknown*/ = arr[`1,[object Object],3,4`];
$(tmpCalleeParam$1);
$(`3xyz`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(undefined);
$([1, , 3, 4][`1,[object Object],3,4`]);
$(`3xyz`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( undefined );
const a = [ 1, ,, 3, 4 ];
const b = a[ "1,[object Object],3,4" ];
$( b );
$( "3xyz" );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: undefined
 - 2: undefined
 - 3: '3xyz'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
