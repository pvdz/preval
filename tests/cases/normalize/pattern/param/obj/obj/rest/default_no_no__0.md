# Preval test case

# default_no_no__0.md

> Normalize > Pattern > Param > Obj > Obj > Rest > Default no no  0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f({ x: { ...y } }) {
  return 'bad';
}
$(f(0, 10));
`````

## Settled


`````js filename=intro
const objPatternNoDefault /*:unknown*/ = (0).x;
const tmpCalleeParam$1 /*:array*/ = [];
objPatternRest(objPatternNoDefault, tmpCalleeParam$1, undefined);
$(`bad`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
objPatternRest((0).x, [], undefined);
$(`bad`);
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let {
    x: { ...y },
  } = tmpParamBare;
  return `bad`;
};
$(f(0, 10));
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternObjRoot = tmpParamBare;
  let objPatternNoDefault = bindingPatternObjRoot.x;
  const tmpCalleeParam = objPatternNoDefault;
  const tmpCalleeParam$1 = [];
  let y = objPatternRest(tmpCalleeParam, tmpCalleeParam$1, undefined);
  return `bad`;
};
const tmpCalleeParam$3 = f(0, 10);
$(tmpCalleeParam$3);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = 0.x;
const b = [];
objPatternRest( a, b, undefined );
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
