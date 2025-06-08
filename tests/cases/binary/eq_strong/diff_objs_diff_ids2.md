# Preval test case

# diff_objs_diff_ids2.md

> Binary > Eq strong > Diff objs diff ids2
>
> If two values compare to the same primitive value in code then we can freely replace them with true or false

## Input

`````js filename=intro
const tmpBinBothRhs = $coerce($, `string`);
let y = !tmpBinBothRhs$1;
$(`out:`, y);
`````


## Settled


`````js filename=intro
$coerce($, `string`);
const y /*:boolean*/ /*banged*/ = !tmpBinBothRhs$1;
$(`out:`, y);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$coerce($, `string`);
$(`out:`, !tmpBinBothRhs$1);
`````


## PST Settled
With rename=true

`````js filename=intro
$coerce( $, "string" );
const a = !tmpBinBothRhs$1;
$( "out:", a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpBinBothRhs = $coerce($, `string`);
let y = !tmpBinBothRhs$1;
$(`out:`, y);
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

tmpBinBothRhs$1


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
