# Preval test case

# base.md

> Normalize > Pattern > Param > Obj > Rest > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f({ ...x }) {
  return x;
}
$(f({ x: 1, b: 2, c: 3 }, 10));
`````


## Settled


`````js filename=intro
const tmpParamBare /*:object*/ = { x: 1, b: 2, c: 3 };
const tmpCalleeParam$1 /*:array*/ = [];
const x /*:unknown*/ = $objPatternRest(tmpParamBare, tmpCalleeParam$1, `x`);
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpParamBare = { x: 1, b: 2, c: 3 };
$($objPatternRest(tmpParamBare, [], `x`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {
  x: 1,
  b: 2,
  c: 3,
};
const b = [];
const c = $objPatternRest( a, b, "x" );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let tmpBindingPatternObjRoot = tmpParamBare;
  let tmpCalleeParam = tmpBindingPatternObjRoot;
  let tmpCalleeParam$1 = [];
  let x = $objPatternRest(tmpCalleeParam, tmpCalleeParam$1, `x`);
  return x;
};
const tmpCallCallee = f;
let tmpCalleeParam$5 = { x: 1, b: 2, c: 3 };
let tmpCalleeParam$3 = f(tmpCalleeParam$5, 10);
$(tmpCalleeParam$3);
`````


## Todos triggered


- (todo) support array reads statement type VarStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: '1', b: '2', c: '3' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
