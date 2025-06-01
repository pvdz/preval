# Preval test case

# base.md

> Normalize > Pattern > Assignment > Arr > Ident > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
([x] = [1, 2, 3]);
$(x);
`````


## Settled


`````js filename=intro
x = 1;
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
x = 1;
$(x);
`````


## PST Settled
With rename=true

`````js filename=intro
x = 1;
$( x );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpArrAssignPatternRhs = [1, 2, 3];
const tmpArrPatternSplat = [...tmpArrAssignPatternRhs];
x = tmpArrPatternSplat[0];
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
 - eval returned: ('<crash[ Cannot set property x of #<Object> which has only a getter ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
