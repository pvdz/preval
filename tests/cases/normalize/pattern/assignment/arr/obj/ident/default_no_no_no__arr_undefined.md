# Preval test case

# default_no_no_no__arr_undefined.md

> Normalize > Pattern > Assignment > Arr > Obj > Ident > Default no no no  arr undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
([{ x }] = [undefined, 20, 30]);
$('bad');
`````


## Settled


`````js filename=intro
x = undefined.x;
$(`bad`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
x = undefined.x;
$(`bad`);
`````


## PST Settled
With rename=true

`````js filename=intro
x = undefined.x;
$( "bad" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpArrAssignPatternRhs = [undefined, 20, 30];
const tmpArrPatternSplat = [...tmpArrAssignPatternRhs];
const tmpArrPatternStep = tmpArrPatternSplat[0];
x = tmpArrPatternStep.x;
$(`bad`);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


BAD@! Found 1 implicit global bindings:

x


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
