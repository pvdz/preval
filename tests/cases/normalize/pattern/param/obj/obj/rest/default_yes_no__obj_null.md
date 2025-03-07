# Preval test case

# default_yes_no__obj_null.md

> Normalize > Pattern > Param > Obj > Obj > Rest > Default yes no  obj null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f({ x: { ...y } = $({ a: 'fail' }) }) {
  return 'bad';
}
$(f({ x: null, b: 11, c: 12 }, 10));
`````

## Settled


`````js filename=intro
const tmpCalleeParam$3 /*:array*/ = [];
objPatternRest(null, tmpCalleeParam$3, undefined);
$(`bad`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
objPatternRest(null, [], undefined);
$(`bad`);
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let { x: { ...y } = $({ a: `fail` }) } = tmpParamBare;
  return `bad`;
};
$(f({ x: null, b: 11, c: 12 }, 10));
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternObjRoot = tmpParamBare;
  let objPatternBeforeDefault = bindingPatternObjRoot.x;
  let objPatternAfterDefault = undefined;
  const tmpIfTest = objPatternBeforeDefault === undefined;
  if (tmpIfTest) {
    const tmpCalleeParam = { a: `fail` };
    objPatternAfterDefault = $(tmpCalleeParam);
  } else {
    objPatternAfterDefault = objPatternBeforeDefault;
  }
  const tmpCalleeParam$1 = objPatternAfterDefault;
  const tmpCalleeParam$3 = [];
  let y = objPatternRest(tmpCalleeParam$1, tmpCalleeParam$3, undefined);
  return `bad`;
};
const tmpCallCallee = f;
const tmpCalleeParam$7 = { x: null, b: 11, c: 12 };
const tmpCalleeParam$5 = tmpCallCallee(tmpCalleeParam$7, 10);
$(tmpCalleeParam$5);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = [];
objPatternRest( null, a, undefined );
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
