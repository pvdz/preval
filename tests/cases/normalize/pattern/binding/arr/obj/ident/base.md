# Preval test case

# base.md

> Normalize > Pattern > Binding > Arr > Obj > Ident > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const [{ x }] = [{ x: 1, y: 2, z: 3 }, 20, 30];
$(x);
`````


## Settled


`````js filename=intro
$(1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpArrElement = { x: 1, y: 2, z: 3 };
const tmpBindingPatternArrRoot = [tmpArrElement, 20, 30];
const tmpArrPatternSplat = [...tmpBindingPatternArrRoot];
const tmpArrPatternStep = tmpArrPatternSplat[0];
const x = tmpArrPatternStep.x;
$(x);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) can we always safely clone ident refs in this case?
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
