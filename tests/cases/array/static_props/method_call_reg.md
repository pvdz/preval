# Preval test case

# method_call_reg.md

> Array > Static props > Method call reg
>
> Getting the length of an array can be tricky, and sometimes be done

We could technically support this kind of thing in a subset of situations. But most of the time we'll just bail.

## Input

`````js filename=intro
const arr = [1, 2, 3];
arr.splice(1, 2, 20);
$(arr.length);
`````


## Settled


`````js filename=intro
$(2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(2);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 2 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const arr = [1, 2, 3];
const tmpMCF = arr.splice;
$dotCall(tmpMCF, arr, `splice`, 1, 2, 20);
let tmpCalleeParam = arr.length;
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
