# Preval test case

# default_no_no__null_1.md

> Normalize > Pattern > Param > Obj > Rest > Default no no  null 1
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f({ ...x }) {
  return 'bad';
}
f(null);
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ = [];
$objPatternRest(null, tmpCalleeParam$1, `x`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$objPatternRest(null, [], `x`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [];
$objPatternRest( null, a, "x" );
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
  return `bad`;
};
f(null);
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
