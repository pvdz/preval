# Preval test case

# string_array_access_ok.md

> Normalize > Static expressions > Statement > String array access ok
>
> The length property on a string literal can be determined at compile time

## Input

`````js filename=intro
$("fop"[1]);
`````


## Settled


`````js filename=intro
$(`o`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`o`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "o" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = `o`;
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'o'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
