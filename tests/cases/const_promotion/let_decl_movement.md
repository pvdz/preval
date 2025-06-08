# Preval test case

# let_decl_movement.md

> Const promotion > Let decl movement
>
> This was a regression. It would throw in a let decl promotion step due to spread.

## Input

`````js filename=intro
let tmpCalleeParam$1 = undefined;
const tmpCalleeParam$3 = [ , , , 1, 20, 30 ];
const arrPatternSplat = [ ...tmpCalleeParam$3 ];
$(tmpCalleeParam$1, arrPatternSplat);
`````


## Settled


`````js filename=intro
const arrPatternSplat /*:array*/ /*truthy*/ = [undefined, undefined, undefined, 1, 20, 30];
$(undefined, arrPatternSplat);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(undefined, [undefined, undefined, undefined, 1, 20, 30]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ undefined, undefined, undefined, 1, 20, 30 ];
$( undefined, a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam$1 = undefined;
const tmpCalleeParam$3 = [, , , 1, 20, 30];
const arrPatternSplat = [...tmpCalleeParam$3];
$(tmpCalleeParam$1, arrPatternSplat);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: undefined, [undefined, undefined, undefined, 1, 20, 30]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
