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
const tmpCalleeParam$3 /*:array*/ = [];
objPatternRest(null, tmpCalleeParam$3, `x`);
$(`bad`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
objPatternRest(null, [], `x`);
$(`bad`);
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let { ...x } = tmpParamBare === undefined ? $({ a: `fail` }) : tmpParamBare;
  return `bad`;
};
$(f(null, 10));
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternObjRoot = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    const tmpCalleeParam = { a: `fail` };
    bindingPatternObjRoot = $(tmpCalleeParam);
  } else {
    bindingPatternObjRoot = tmpParamBare;
  }
  const tmpCalleeParam$1 = bindingPatternObjRoot;
  const tmpCalleeParam$3 = [];
  let x = objPatternRest(tmpCalleeParam$1, tmpCalleeParam$3, `x`);
  return `bad`;
};
const tmpCalleeParam$5 = f(null, 10);
$(tmpCalleeParam$5);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = [];
objPatternRest( null, a, "x" );
$( "bad" );
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
