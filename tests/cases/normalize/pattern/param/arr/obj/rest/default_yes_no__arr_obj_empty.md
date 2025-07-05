# Preval test case

# default_yes_no__arr_obj_empty.md

> Normalize > Pattern > Param > Arr > Obj > Rest > Default yes no  arr obj empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f([{ ...x } = $({ a: 'fail' })]) {
  return x;
}
$(f([{}, 20, 30], 200));
`````


## Settled


`````js filename=intro
const tmpArrElement /*:object*/ /*truthy*/ = {};
const tmpCalleeParam$3 /*:array*/ /*truthy*/ = [];
const x /*:unknown*/ = $objPatternRest(tmpArrElement, tmpCalleeParam$3, undefined);
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrElement = {};
$($objPatternRest(tmpArrElement, [], undefined));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {};
const b = [];
const c = $objPatternRest( a, b, undefined );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let tmpBindingPatternArrRoot = tmpParamBare;
  let tmpArrPatternSplat = [...tmpBindingPatternArrRoot];
  let tmpAPBD = tmpArrPatternSplat[0];
  let tmpArrPatternStep = undefined;
  const tmpIfTest = tmpAPBD === undefined;
  if (tmpIfTest) {
    let tmpCalleeParam = { a: `fail` };
    tmpArrPatternStep = $(tmpCalleeParam);
  } else {
    tmpArrPatternStep = tmpAPBD;
  }
  let tmpCalleeParam$1 = tmpArrPatternStep;
  let tmpCalleeParam$3 = [];
  let x = $objPatternRest(tmpCalleeParam$1, tmpCalleeParam$3, undefined);
  return x;
};
const tmpCallCallee = f;
const tmpArrElement = {};
let tmpCalleeParam$7 = [tmpArrElement, 20, 30];
let tmpCalleeParam$5 = f(tmpCalleeParam$7, 200);
$(tmpCalleeParam$5);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) array reads var statement with init ArrayExpression
- (todo) array reads var statement with init CallExpression
- (todo) can we always safely clone ident refs in this case?
- (todo) support Identifier as var init in let_hoisting noob check
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
