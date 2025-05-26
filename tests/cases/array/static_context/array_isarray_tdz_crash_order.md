# Preval test case

# array_isarray_tdz_crash_order.md

> Array > Static context > Array isarray tdz crash order
>
> Array.isArray does not care about the contents

## Input

`````js filename=intro
$(Array.isArray([i_crash_first, crash_hard]));
`````


## Settled


`````js filename=intro
i_crash_first;
crash_hard;
$(true);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
i_crash_first;
crash_hard;
$(true);
`````


## PST Settled
With rename=true

`````js filename=intro
i_crash_first;
crash_hard;
$( true );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Array_isArray;
const tmpMCP = [i_crash_first, crash_hard];
let tmpCalleeParam = $dotCall(tmpMCF, $array_constructor, `isArray`, tmpMCP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement


## Globals


BAD@! Found 2 implicit global bindings:

i_crash_first, crash_hard


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
