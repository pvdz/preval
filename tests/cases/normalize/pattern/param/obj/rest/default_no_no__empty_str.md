# Preval test case

# default_no_no__empty_str.md

> Normalize > Pattern > Param > Obj > Rest > Default no no  empty str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f({ ...x } = $({ a: 'fail' })) {
  return x;
}
$(f('', 10));
`````


## Settled


`````js filename=intro
const tmpCalleeParam$3 /*:array*/ /*truthy*/ = [];
const x /*:unknown*/ = $objPatternRest(``, tmpCalleeParam$3, `x`);
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($objPatternRest(``, [], `x`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [];
const b = $objPatternRest( "", a, "x" );
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let tmpBindingPatternObjRoot = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    let tmpCalleeParam = { a: `fail` };
    tmpBindingPatternObjRoot = $(tmpCalleeParam);
  } else {
    tmpBindingPatternObjRoot = tmpParamBare;
  }
  let tmpCalleeParam$1 = tmpBindingPatternObjRoot;
  let tmpCalleeParam$3 = [];
  let x = $objPatternRest(tmpCalleeParam$1, tmpCalleeParam$3, `x`);
  return x;
};
let tmpCalleeParam$5 = f(``, 10);
$(tmpCalleeParam$5);
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
