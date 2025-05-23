# Preval test case

# shl.md

> Normalize > Compound > Coverage > Shl
>
> Compound assignments should destructure to regular assignments

## Input

`````js filename=intro
let a = 1, b = 2;
a <<= b;
$(a);
`````


## Settled


`````js filename=intro
$(4);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(4);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 4 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = 1;
let b = 2;
a = a << b;
$(a);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 4
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
