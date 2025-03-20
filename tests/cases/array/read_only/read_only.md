# Preval test case

# read_only.md

> Array > Read only > Read only
>
> Arrays where it only reads properties

## Input

`````js filename=intro
const arr = [1, 2, 3, 4];
$(arr[1]);
$(arr[3]);
$(`${arr[2]}xyz`);
`````


## Settled


`````js filename=intro
$(2);
$(4);
$(`3xyz`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(2);
$(4);
$(`3xyz`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 2 );
$( 4 );
$( "3xyz" );
`````


## Todos triggered


- inline computed array property read


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - 2: 4
 - 3: '3xyz'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
