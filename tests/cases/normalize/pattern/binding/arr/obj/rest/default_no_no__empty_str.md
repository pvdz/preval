# Preval test case

# default_no_no__empty_str.md

> Normalize > Pattern > Binding > Arr > Obj > Rest > Default no no  empty str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const [{ ...x }] = '';
$(x);
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [];
const x /*:unknown*/ = $objPatternRest(undefined, tmpCalleeParam$1, undefined);
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($objPatternRest(undefined, [], undefined));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [];
const b = $objPatternRest( undefined, a, undefined );
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpBindingPatternArrRoot = ``;
const tmpArrPatternSplat = [...tmpBindingPatternArrRoot];
const tmpArrPatternStep = tmpArrPatternSplat[0];
let tmpCalleeParam = tmpArrPatternStep;
let tmpCalleeParam$1 = [];
const x = $objPatternRest(tmpCalleeParam, tmpCalleeParam$1, undefined);
$(x);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) array reads var statement with init CallExpression
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
