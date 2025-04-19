# Preval test case

# base.md

> Function > Prototype > Base
>
> The function has its own prototype object, not to be confused
> with func.__proto__ which would point to Function.prototype

## Input

`````js filename=intro
$(function(){}.prototype);
`````


## Settled


`````js filename=intro
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( undefined );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: BAD!!
 - !1: undefined
 -  eval returned: undefined

Denormalized calls: BAD!!
 - !1: undefined
 -  eval returned: undefined
