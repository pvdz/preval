# Preval test case

# default_no_no__obj_undefined.md

> Normalize > Pattern > Param > Obj > Obj > Rest > Default no no  obj undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f({ x: { ...y } }) {
  return 'bad';
}
$(f({ x: undefined, b: 11, c: 12 }, 10));
`````

## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ = [];
objPatternRest(undefined, tmpCalleeParam$1, undefined);
$(`bad`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
objPatternRest(undefined, [], undefined);
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
$(f({ x: undefined, b: 11, c: 12 }, 10));
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
const tmpCallCallee = f;
const tmpCalleeParam$5 = { x: undefined, b: 11, c: 12 };
const tmpCalleeParam$3 = tmpCallCallee(tmpCalleeParam$5, 10);
$(tmpCalleeParam$3);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = [];
objPatternRest( undefined, a, undefined );
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
