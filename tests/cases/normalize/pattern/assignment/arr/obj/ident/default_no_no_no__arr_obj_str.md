# Preval test case

# default_no_no_no__arr_obj_str.md

> Normalize > Pattern > Assignment > Arr > Obj > Ident > Default no no no  arr obj str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
([{ x }] = [{ x: 'abc', y: 2, z: 3 }, 20, 30]);
$(x);
`````


## Settled


`````js filename=intro
x = `abc`;
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
x = `abc`;
$(x);
`````


## PST Settled
With rename=true

`````js filename=intro
x = "abc";
$( x );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpArrElement = { x: `abc`, y: 2, z: 3 };
const tmpArrAssignPatternRhs = [tmpArrElement, 20, 30];
const tmpArrPatternSplat = [...tmpArrAssignPatternRhs];
const tmpArrPatternStep = tmpArrPatternSplat[0];
x = tmpArrPatternStep.x;
$(x);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) can we always safely clone ident refs in this case?
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
