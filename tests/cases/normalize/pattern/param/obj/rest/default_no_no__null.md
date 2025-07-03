# Preval test case

# default_no_no__null.md

> Normalize > Pattern > Param > Obj > Rest > Default no no  null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f({ ...x } = $({ a: 'fail' })) {
  return 'bad';
}
$(f(null, 10));
`````


## Settled


`````js filename=intro
const tmpCalleeParam$3 /*:array*/ /*truthy*/ = [];
$objPatternRest(null, tmpCalleeParam$3, `x`);
$(`bad`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$objPatternRest(null, [], `x`);
$(`bad`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [];
$objPatternRest( null, a, "x" );
$( "bad" );
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
  return `bad`;
};
let tmpCalleeParam$5 = f(null, 10);
$(tmpCalleeParam$5);
`````


## Todos triggered


- (todo) array reads var statement with init CallExpression
- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
