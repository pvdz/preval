# Preval test case

# array_isarray_123.md

> Array > Static context > Array isarray 123
>
> Array.isArray does not care about the contents

## Input

`````js filename=intro
$(Array.isArray([1,2,3]));
`````


## Settled


`````js filename=intro
$(true);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(true);
`````


## PST Settled
With rename=true

`````js filename=intro
$( true );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Array_isArray;
const tmpMCP = [1, 2, 3];
let tmpCalleeParam = $dotCall(tmpMCF, $array_constructor, `isArray`, tmpMCP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
