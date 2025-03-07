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

## Pre Normal


`````js filename=intro
$(true + [].flat);
`````

## Normalized


`````js filename=intro
const tmpBinBothLhs = true;
const tmpCompObj = [];
const tmpBinBothRhs = tmpCompObj.flat;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
$( "truefunction flat() { [native code] }" );
`````

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
