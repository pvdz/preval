# Preval test case

# nan_plus_array_flat.md

> Property lookup > Nan plus array flat
>
> wat

## Input

`````js filename=intro
// Resulting output after one pass [intro]
const tmpBinBothRhs$893 = $Array_prototype.flat;
const tmpCompObj$459 = NaN + tmpBinBothRhs$893;
$(tmpCompObj$459);
`````


## Settled


`````js filename=intro
$(`NaNfunction flat() { [native code] }`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`NaNfunction flat() { [native code] }`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "NaNfunction flat() { [native code] }" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpBinBothRhs$893 = $array_flat;
const tmpCompObj$459 = NaN + tmpBinBothRhs$893;
$(tmpCompObj$459);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'NaNfunction() { [native code] }'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
