# Preval test case

# nan_tostring_multi_arg.md

> Dot call > Nan tostring multi arg
>
> Inlining $dotCall cases when we know what they are actually doing

## Input

`````js filename=intro
const naN = NaN;
const tmpCallVal = naN.toString;
const x = $dotCall(tmpCallVal, naN, 'toString', 2, $, unknown);
$(x);
`````


## Settled


`````js filename=intro
unknown;
$(`NaN`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
unknown;
$(`NaN`);
`````


## PST Settled
With rename=true

`````js filename=intro
unknown;
$( "NaN" );
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

unknown


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
