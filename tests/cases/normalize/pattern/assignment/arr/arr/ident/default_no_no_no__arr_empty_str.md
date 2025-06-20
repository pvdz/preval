# Preval test case

# default_no_no_no__arr_empty_str.md

> Normalize > Pattern > Assignment > Arr > Arr > Ident > Default no no no  arr empty str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
([[x]] = ['', 4, 5]);
$(x);
`````


## Settled


`````js filename=intro
x = undefined;
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
x = undefined;
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
x = undefined;
$( undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpArrAssignPatternRhs = [``, 4, 5];
const tmpArrPatternSplat = [...tmpArrAssignPatternRhs];
const tmpArrPatternStep = tmpArrPatternSplat[0];
const tmpArrPatternSplat$1 = [...tmpArrPatternStep];
x = tmpArrPatternSplat$1[0];
$(x);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
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
