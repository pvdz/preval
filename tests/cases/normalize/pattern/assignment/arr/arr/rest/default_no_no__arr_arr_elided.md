# Preval test case

# default_no_no__arr_arr_elided.md

> Normalize > Pattern > Assignment > Arr > Arr > Rest > Default no no  arr arr elided
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
([[...x]] = [[, , , 1], 4, 5]);
$(x);
`````


## Settled


`````js filename=intro
x = [undefined, undefined, undefined, 1];
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
x = [undefined, undefined, undefined, 1];
$(x);
`````


## PST Settled
With rename=true

`````js filename=intro
x = [ undefined, undefined, undefined, 1 ];
$( x );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpArrElement = [, , , 1];
const tmpArrAssignPatternRhs = [tmpArrElement, 4, 5];
const tmpArrPatternSplat = [...tmpArrAssignPatternRhs];
const tmpArrPatternStep = tmpArrPatternSplat[0];
const tmpArrPatternSplat$1 = [...tmpArrPatternStep];
const tmpMCF = tmpArrPatternSplat$1.slice;
x = $dotCall(tmpMCF, tmpArrPatternSplat$1, `slice`, 0);
$(x);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) access object property that also exists on prototype? $array_slice
- (todo) array reads var statement with init MemberExpression
- (todo) can we always safely clone ident refs in this case?
- (todo) support array reads statement type ExpressionStatement
- (todo) type trackeed tricks can possibly support static $array_slice
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


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
