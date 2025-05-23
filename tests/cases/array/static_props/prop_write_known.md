# Preval test case

# prop_write_known.md

> Array > Static props > Prop write known
>
> Getting the length of an array can be tricky, and sometimes be done

We could potentially detect the literal write and still support this kind of case. Is that worth it?

If so, we can still assume the arr.length, but we will have to do tracking to assert the actual value of each index.

## Input

`````js filename=intro
const arr = [1, 2, 3];
arr[2] = 10;
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
arr[2] = 10;
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
