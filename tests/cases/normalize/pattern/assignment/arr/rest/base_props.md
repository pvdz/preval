# Preval test case

# base_props.md

> Normalize > Pattern > Assignment > Arr > Rest > Base props
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
([a, ...x] = [1, 2, 3]);
$(x);
`````


## Settled


`````js filename=intro
a = 1;
x = [2, 3];
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
a = 1;
x = [2, 3];
$(x);
`````


## PST Settled
With rename=true

`````js filename=intro
a = 1;
x = [ 2, 3 ];
$( x );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpArrAssignPatternRhs = [1, 2, 3];
const tmpArrPatternSplat = [...tmpArrAssignPatternRhs];
a = tmpArrPatternSplat[0];
const tmpMCF = tmpArrPatternSplat.slice;
x = $dotCall(tmpMCF, tmpArrPatternSplat, `slice`, 1);
$(x);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) access object property that also exists on prototype? $array_slice
- (todo) arr mutation may be able to inline this method: tmpMCF
- (todo) support array reads statement type ExpressionStatement
- (todo) type trackeed tricks can possibly support static $array_slice
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


BAD@! Found 2 implicit global bindings:

a, x


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
