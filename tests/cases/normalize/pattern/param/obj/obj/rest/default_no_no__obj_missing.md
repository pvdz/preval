# Preval test case

# default_no_no__obj_missing.md

> Normalize > Pattern > Param > Obj > Obj > Rest > Default no no  obj missing
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f({ x: { ...y } }) {
  return 'bad';
}
$(f({ b: 11, c: 12 }, 10));
`````


## Settled


`````js filename=intro
const tmpOPND /*:unknown*/ = $Object_prototype.x;
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [];
$objPatternRest(tmpOPND, tmpCalleeParam$1, undefined);
$(`bad`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$objPatternRest($Object_prototype.x, [], undefined);
$(`bad`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $Object_prototype.x;
const b = [];
$objPatternRest( a, b, undefined );
$( "bad" );
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
  return `bad`;
};
const tmpCallCallee = f;
let tmpCalleeParam$5 = { b: 11, c: 12 };
let tmpCalleeParam$3 = f(tmpCalleeParam$5, 10);
$(tmpCalleeParam$3);
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
