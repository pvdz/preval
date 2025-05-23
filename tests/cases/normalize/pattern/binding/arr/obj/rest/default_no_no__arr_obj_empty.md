# Preval test case

# default_no_no__arr_obj_empty.md

> Normalize > Pattern > Binding > Arr > Obj > Rest > Default no no  arr obj empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const [{ ...x }] = [{}, 20, 30];
$(x);
`````


## Settled


`````js filename=intro
const tmpArrElement /*:object*/ = {};
const tmpCalleeParam$1 /*:array*/ = [];
const x /*:unknown*/ = $objPatternRest(tmpArrElement, tmpCalleeParam$1, undefined);
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrElement = {};
$($objPatternRest(tmpArrElement, [], undefined));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {};
const b = [];
const c = $objPatternRest( a, b, undefined );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpArrElement = {};
const tmpBindingPatternArrRoot = [tmpArrElement, 20, 30];
const tmpArrPatternSplat = [...tmpBindingPatternArrRoot];
const tmpArrPatternStep = tmpArrPatternSplat[0];
let tmpCalleeParam = tmpArrPatternStep;
let tmpCalleeParam$1 = [];
const x = $objPatternRest(tmpCalleeParam, tmpCalleeParam$1, undefined);
$(x);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) can we always safely clone ident refs in this case?
- (todo) support array reads statement type VarStatement
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
