# Preval test case

# default_yes_yes_yes__arr_obj_123.md

> Normalize > Pattern > Param > Arr > Obj > Ident > Default yes yes yes  arr obj 123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f([{ x = $('fail') } = $({ x: 'fail2' })] = $([{ x: 'fail3' }])) {
  return x;
}
$(f([{ x: 1, y: 2, z: 3 }, 20, 30], 200));
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
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let tmpBindingPatternArrRoot = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    const tmpArrElement = { x: `fail3` };
    let tmpCalleeParam = [tmpArrElement];
    tmpBindingPatternArrRoot = $(tmpCalleeParam);
  } else {
    tmpBindingPatternArrRoot = tmpParamBare;
  }
  let tmpArrPatternSplat = [...tmpBindingPatternArrRoot];
  let tmpAPBD = tmpArrPatternSplat[0];
  let tmpArrPatternStep = undefined;
  const tmpIfTest$1 = tmpAPBD === undefined;
  if (tmpIfTest$1) {
    let tmpCalleeParam$1 = { x: `fail2` };
    tmpArrPatternStep = $(tmpCalleeParam$1);
  } else {
    tmpArrPatternStep = tmpAPBD;
  }
  let tmpOPBD = tmpArrPatternStep.x;
  let x = undefined;
  const tmpIfTest$3 = tmpOPBD === undefined;
  if (tmpIfTest$3) {
    x = $(`fail`);
    return x;
  } else {
    x = tmpOPBD;
    return x;
  }
};
const tmpCallCallee = f;
const tmpArrElement$1 = { x: 1, y: 2, z: 3 };
let tmpCalleeParam$5 = [tmpArrElement$1, 20, 30];
let tmpCalleeParam$3 = f(tmpCalleeParam$5, 200);
$(tmpCalleeParam$3);
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
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
