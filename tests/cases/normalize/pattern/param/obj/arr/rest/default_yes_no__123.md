# Preval test case

# default_yes_no__123.md

> Normalize > Pattern > Param > Obj > Arr > Rest > Default yes no  123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f({ x: [...y] = $(['fail']) }) {
  return y;
}
$(f({ x: [1, 2, 3], a: 11, b: 12 }, 10));
`````


## Settled


`````js filename=intro
const y /*:array*/ /*truthy*/ = [1, 2, 3];
$(y);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$([1, 2, 3]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 1, 2, 3 ];
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let tmpBindingPatternObjRoot = tmpParamBare;
  let tmpOPBD = tmpBindingPatternObjRoot.x;
  let tmpOPAD = undefined;
  const tmpIfTest = tmpOPBD === undefined;
  if (tmpIfTest) {
    let tmpCalleeParam = [`fail`];
    tmpOPAD = $(tmpCalleeParam);
  } else {
    tmpOPAD = tmpOPBD;
  }
  let tmpArrPatternSplat = [...tmpOPAD];
  const tmpMCF = tmpArrPatternSplat.slice;
  let y = $dotCall(tmpMCF, tmpArrPatternSplat, `slice`, 0);
  return y;
};
const tmpCallCallee = f;
const tmpObjLitVal = [1, 2, 3];
let tmpCalleeParam$3 = { x: tmpObjLitVal, a: 11, b: 12 };
let tmpCalleeParam$1 = f(tmpCalleeParam$3, 10);
$(tmpCalleeParam$1);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) access object property that also exists on prototype? $array_slice
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement
- (todo) type trackeed tricks can possibly support static $array_slice


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [1, 2, 3]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
