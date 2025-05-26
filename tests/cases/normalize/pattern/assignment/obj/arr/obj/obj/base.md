# Preval test case

# base.md

> Normalize > Pattern > Assignment > Obj > Arr > Obj > Obj > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
({
  x: [
    {
      y: {},
    },
  ],
} = { x: [{ x: 15, y: { a: 1, b: 2, c: 3 }, c: 16 }, 13, 14], a: 11, b: 12 });
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
const tmpObjLitVal$1 = 15;
const tmpObjLitVal$3 = { a: 1, b: 2, c: 3 };
const tmpArrElement = { x: tmpObjLitVal$1, y: tmpObjLitVal$3, c: 16 };
const tmpObjLitVal = [tmpArrElement, 13, 14];
const tmpAssignObjPatternRhs = { x: tmpObjLitVal, a: 11, b: 12 };
const tmpOPND = tmpAssignObjPatternRhs.x;
const tmpArrPatternSplat = [...tmpOPND];
const tmpArrPatternStep = tmpArrPatternSplat[0];
const tmpOPND$1 = tmpArrPatternStep.y;
let tmpObjPatternCrashTest = tmpOPND$1 === undefined;
if (tmpObjPatternCrashTest) {
} else {
  tmpObjPatternCrashTest = tmpOPND$1 === null;
}
if (tmpObjPatternCrashTest) {
  tmpObjPatternCrashTest = tmpOPND$1.cannotDestructureThis;
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
