# Preval test case

# default_no__arr_empty.md

> Normalize > Pattern > Assignment > Arr > Rest > Default no  arr empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
([...x] = []);
$(x);
`````


## Settled


`````js filename=intro
x = [];
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
x = [];
$(x);
`````


## PST Settled
With rename=true

`````js filename=intro
x = [];
$( x );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpArrAssignPatternRhs = [];
const tmpArrPatternSplat = [...tmpArrAssignPatternRhs];
const tmpMCF = tmpArrPatternSplat.slice;
x = $dotCall(tmpMCF, tmpArrPatternSplat, `slice`, 0);
$(x);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) access object property that also exists on prototype? $array_slice
- (todo) arr mutation may be able to inline this method: tmpMCF
- (todo) support array reads statement type ExpressionStatement
- (todo) type trackeed tricks can possibly support static $array_slice


## Globals


BAD@! Found 1 implicit global bindings:

x


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
