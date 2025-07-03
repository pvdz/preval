# Preval test case

# default_no_no__obj_empty_str.md

> Normalize > Pattern > Param > Obj > Obj > Rest > Default no no  obj empty str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f({ x: { ...y } }) {
  return y;
}
$(f({ x: '', b: 11, c: 12 }, 10));
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [];
const y /*:unknown*/ = $objPatternRest(``, tmpCalleeParam$1, undefined);
$(y);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($objPatternRest(``, [], undefined));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [];
const b = $objPatternRest( "", a, undefined );
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let tmpBindingPatternObjRoot = tmpParamBare;
  let tmpOPND = tmpBindingPatternObjRoot.x;
  let tmpCalleeParam = tmpOPND;
  let tmpCalleeParam$1 = [];
  let y = $objPatternRest(tmpCalleeParam, tmpCalleeParam$1, undefined);
  return y;
};
const tmpCallCallee = f;
let tmpCalleeParam$5 = { x: ``, b: 11, c: 12 };
let tmpCalleeParam$3 = f(tmpCalleeParam$5, 10);
$(tmpCalleeParam$3);
`````


## Todos triggered


- (todo) array reads var statement with init CallExpression


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
