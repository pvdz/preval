# Preval test case

# elided.md

> Array > Read only > Elided
>
> Arrays where it only reads properties

## Input

`````js filename=intro
const arr = [1, , 3, 4];
$(arr[1]);
$(arr[3]);
$(`${arr[2]}xyz`);
`````


## Settled


`````js filename=intro
$(undefined);
$(4);
$(`3xyz`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(undefined);
$(4);
$(`3xyz`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( undefined );
$( 4 );
$( "3xyz" );
`````


## Todos triggered


- inline computed array property read


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: undefined
 - 2: 4
 - 3: '3xyz'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
