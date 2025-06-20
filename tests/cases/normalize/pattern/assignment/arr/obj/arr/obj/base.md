# Preval test case

# base.md

> Normalize > Pattern > Assignment > Arr > Obj > Arr > Obj > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
([
  {
    x: [{}],
  },
] = [{ x: [{ a: 1, b: 2, c: 3 }, 12], y: 11 }, 10]);
$('ok');
`````


## Settled


`````js filename=intro
$(`ok`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`ok`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "ok" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpArrElement$1 = { a: 1, b: 2, c: 3 };
const tmpObjLitVal = [tmpArrElement$1, 12];
const tmpArrElement = { x: tmpObjLitVal, y: 11 };
const tmpArrAssignPatternRhs = [tmpArrElement, 10];
const tmpArrPatternSplat = [...tmpArrAssignPatternRhs];
const tmpArrPatternStep = tmpArrPatternSplat[0];
const tmpOPND = tmpArrPatternStep.x;
const tmpArrPatternSplat$1 = [...tmpOPND];
const tmpArrPatternStep$1 = tmpArrPatternSplat$1[0];
let tmpObjPatternCrashTest = tmpArrPatternStep$1 === undefined;
if (tmpObjPatternCrashTest) {
} else {
  tmpObjPatternCrashTest = tmpArrPatternStep$1 === null;
}
if (tmpObjPatternCrashTest) {
  tmpObjPatternCrashTest = tmpArrPatternStep$1.cannotDestructureThis;
  $(`ok`);
} else {
  $(`ok`);
}
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) can we always safely clone ident refs in this case?
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'ok'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
