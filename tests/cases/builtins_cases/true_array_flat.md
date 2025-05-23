# Preval test case

# true_array_flat.md

> Builtins cases > True array flat
>
>

## Input

`````js filename=intro
$(true + [].flat);
`````


## Settled


`````js filename=intro
$(`truefunction flat() { [native code] }`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`truefunction flat() { [native code] }`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "truefunction flat() { [native code] }" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpBinBothLhs = true;
const tmpCompObj = [];
const tmpBinBothRhs = tmpCompObj.flat;
let tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'truefunction() { [native code] }'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
