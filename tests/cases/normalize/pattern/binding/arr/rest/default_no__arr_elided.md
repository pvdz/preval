# Preval test case

# default_no__arr_elided.md

> Normalize > Pattern > Binding > Arr > Rest > Default no  arr elided
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const [...x] = [, , , 1];
$(x);
`````


## Settled


`````js filename=intro
const x /*:array*/ = [undefined, undefined, undefined, 1];
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$([undefined, undefined, undefined, 1]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ undefined, undefined, undefined, 1 ];
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpBindingPatternArrRoot = [, , , 1];
const tmpArrPatternSplat = [...tmpBindingPatternArrRoot];
const tmpMCF = tmpArrPatternSplat.slice;
const x = $dotCall(tmpMCF, tmpArrPatternSplat, `slice`, 0);
$(x);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) access object property that also exists on prototype? $array_slice
- (todo) arr mutation may be able to inline this method: tmpMCF
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement
- (todo) type trackeed tricks can possibly support static $array_slice


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [undefined, undefined, undefined, 1]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
