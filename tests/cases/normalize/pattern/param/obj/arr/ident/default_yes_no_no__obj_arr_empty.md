# Preval test case

# default_yes_no_no__obj_arr_empty.md

> Normalize > Pattern > Param > Obj > Arr > Ident > Default yes no no  obj arr empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f({ x: [y = 'pass'] }) {
  return y;
}
$(f({ x: [], a: 11, b: 12 }, 10));
`````


## Settled


`````js filename=intro
$(`pass`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`pass`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "pass" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let tmpBindingPatternObjRoot = tmpParamBare;
  let tmpOPND = tmpBindingPatternObjRoot.x;
  let tmpArrPatternSplat = [...tmpOPND];
  let tmpAPBD = tmpArrPatternSplat[0];
  let y = undefined;
  const tmpIfTest = tmpAPBD === undefined;
  if (tmpIfTest) {
    y = `pass`;
    return y;
  } else {
    y = tmpAPBD;
    return y;
  }
};
const tmpCallCallee = f;
const tmpObjLitVal = [];
let tmpCalleeParam$1 = { x: tmpObjLitVal, a: 11, b: 12 };
let tmpCalleeParam = f(tmpCalleeParam$1, 10);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) array reads var statement with init ObjectExpression
- (todo) fixme: spyless vars and labeled nodes
- (todo) support array reads statement type ExpressionStatement
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
