# Preval test case

# default_no_no__arr_obj_empty.md

> Normalize > Pattern > Assignment > Arr > Obj > Rest > Default no no  arr obj empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
([{ ...x }] = [{}, 20, 30]);
$(x);
`````


## Settled


`````js filename=intro
const tmpArrElement /*:object*/ = {};
const tmpCalleeParam$1 /*:array*/ = [];
x = $objPatternRest(tmpArrElement, tmpCalleeParam$1, undefined);
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
x = $objPatternRest({}, [], undefined);
$(x);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {};
const b = [];
x = $objPatternRest( a, b, undefined );
$( x );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpArrElement = {};
const tmpArrAssignPatternRhs = [tmpArrElement, 20, 30];
const tmpArrPatternSplat = [...tmpArrAssignPatternRhs];
const tmpArrPatternStep = tmpArrPatternSplat[0];
let tmpCalleeParam = tmpArrPatternStep;
let tmpCalleeParam$1 = [];
x = $objPatternRest(tmpCalleeParam, tmpCalleeParam$1, undefined);
$(x);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) can we always safely clone ident refs in this case?
- (todo) support array reads statement type ExpressionStatement
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
