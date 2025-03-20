# Preval test case

# obj.md

> Builtins cases > EncodeURIComponent > Obj
>
>

## Input

`````js filename=intro
$(encodeURIComponent({wat: true}));
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:object*/ = { wat: true };
const tmpCalleeParam /*:string*/ = encodeURIComponent(tmpCalleeParam$1);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(encodeURIComponent({ wat: true }));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { wat: true };
const b = encodeURIComponent( a );
$( b );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '%5Bobject%20Object%5D'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
