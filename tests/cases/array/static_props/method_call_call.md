# Preval test case

# method_call_call.md

> Array > Static props > Method call call
>
> Getting the length of an array can be tricky, and sometimes be done

In this case the array escapes so we bail.

This particular case could be supported but it's probably not worth it.

## Input

`````js filename=intro
const arr = [1, 2, 3];
arr.splice.call(arr, 1, 2, 10, 20);
$(arr.length);
`````


## Settled


`````js filename=intro
$(3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(3);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 3 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const arr = [1, 2, 3];
const tmpMCOO = arr.splice;
const tmpMCF = tmpMCOO.call;
$dotCall(tmpMCF, tmpMCOO, `call`, arr, 1, 2, 10, 20);
let tmpCalleeParam = arr.length;
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
