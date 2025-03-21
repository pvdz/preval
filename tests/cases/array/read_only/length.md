# Preval test case

# length.md

> Array > Read only > Length
>
> Arrays where it only reads properties

## Input

`````js filename=intro
const arr = [1, 2, 3, 4];
$(arr['length']);
$(arr[false]);
$(`${arr[2]}xyz`);
`````


## Settled


`````js filename=intro
$(4);
const arr /*:array*/ = [1, 2, 3, 4];
const tmpCalleeParam$1 /*:unknown*/ = arr.false;
$(tmpCalleeParam$1);
$(`3xyz`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(4);
$([1, 2, 3, 4].false);
$(`3xyz`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 4 );
const a = [ 1, 2, 3, 4 ];
const b = a.false;
$( b );
$( "3xyz" );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 4
 - 2: undefined
 - 3: '3xyz'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
