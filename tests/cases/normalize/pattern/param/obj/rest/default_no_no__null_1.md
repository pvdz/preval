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

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let { ...x } = tmpParamBare;
  return `bad`;
};
f(null);
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternObjRoot = tmpParamBare;
  const tmpCalleeParam = bindingPatternObjRoot;
  const tmpCalleeParam$1 = [];
  let x = $objPatternRest(tmpCalleeParam, tmpCalleeParam$1, `x`);
  return `bad`;
};
f(null);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = [];
$objPatternRest( null, a, "x" );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
