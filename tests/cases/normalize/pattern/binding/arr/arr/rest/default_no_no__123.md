# Preval test case

# default_no_no__123.md

> Normalize > Pattern > Binding > Arr > Arr > Rest > Default no no  123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const [[...x]] = [[ 100, 200 ]];
$(x);
`````


## Settled


`````js filename=intro
const x /*:array*/ = [100, 200];
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$([100, 200]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 100, 200 ];
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpArrElement = [100, 200];
const tmpBindingPatternArrRoot = [tmpArrElement];
const tmpArrPatternSplat = [...tmpBindingPatternArrRoot];
const tmpArrPatternStep = tmpArrPatternSplat[0];
const tmpArrPatternSplat$1 = [...tmpArrPatternStep];
const tmpMCF = tmpArrPatternSplat$1.slice;
const x = $dotCall(tmpMCF, tmpArrPatternSplat$1, `slice`, 0);
$(x);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) access object property that also exists on prototype? $array_slice
- (todo) can we always safely clone ident refs in this case?
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement
- (todo) type trackeed tricks can possibly support static $array_slice
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [100, 200]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
