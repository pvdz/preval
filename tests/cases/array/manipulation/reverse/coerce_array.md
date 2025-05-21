# Preval test case

# coerce_array.md

> Array > Manipulation > Reverse > Coerce array
>
> We can do this kind of contrived cases tho

## Input

`````js filename=intro
const arr = [1, 2];
const rra = arr.reverse();
const s = $coerce(rra, `string`);
$(s)
`````


## Settled


`````js filename=intro
$(`2,1`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`2,1`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "2,1" );
`````


## Todos triggered


- (todo) arr mutation may be able to inline this method: tmpMCF


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '2,1'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
