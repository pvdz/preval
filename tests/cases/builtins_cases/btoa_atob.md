# Preval test case

# btoa_atob.md

> Builtins cases > Btoa atob
>
> built-in for nodejs

## Input

`````js filename=intro
$(atob(btoa("isn't encoding fun?")));
`````


## Settled


`````js filename=intro
$(`isn't encoding fun?`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`isn't encoding fun?`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "isn't encoding fun?" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam$1 = `aXNuJ3QgZW5jb2RpbmcgZnVuPw==`;
let tmpCalleeParam = atob(tmpCalleeParam$1);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: "isn't encoding fun?"
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
