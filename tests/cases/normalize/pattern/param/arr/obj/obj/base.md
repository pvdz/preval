# Preval test case

# base.md

> Normalize > Pattern > Param > Arr > Obj > Obj > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f([
  {
    x: {},
  },
]) {
  return 'ok';
}
$(f([{ x: [{ a: 1, b: 2, c: 3 }, 12], y: 11 }, 10], 100));
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
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let tmpBindingPatternArrRoot = tmpParamBare;
  let tmpArrPatternSplat = [...tmpBindingPatternArrRoot];
  let tmpArrPatternStep = tmpArrPatternSplat[0];
  let tmpOPND = tmpArrPatternStep.x;
  let tmpObjPatternCrashTest = tmpOPND === undefined;
  if (tmpObjPatternCrashTest) {
  } else {
    tmpObjPatternCrashTest = tmpOPND === null;
  }
  if (tmpObjPatternCrashTest) {
    tmpObjPatternCrashTest = tmpOPND.cannotDestructureThis;
    return `ok`;
  } else {
    return `ok`;
  }
};
const tmpCallCallee = f;
const tmpArrElement$1 = { a: 1, b: 2, c: 3 };
const tmpObjLitVal = [tmpArrElement$1, 12];
const tmpArrElement = { x: tmpObjLitVal, y: 11 };
let tmpCalleeParam$1 = [tmpArrElement, 10];
let tmpCalleeParam = f(tmpCalleeParam$1, 100);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) array reads var statement with init ArrayExpression
- (todo) array reads var statement with init ObjectExpression
- (todo) can we always safely clone ident refs in this case?
- (todo) fixme: spyless vars and labeled nodes
- (todo) support array reads statement type ExpressionStatement
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
