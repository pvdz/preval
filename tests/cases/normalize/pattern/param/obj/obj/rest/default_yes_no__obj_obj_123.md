# Preval test case

# default_yes_no__obj_obj_123.md

> Normalize > Pattern > Param > Obj > Obj > Rest > Default yes no  obj obj 123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f({ x: { ...y } = $({ a: 'fail' }) }) {
  return y;
}
$(f({ x: { x: 1, y: 2, z: 3 }, b: 11, c: 12 }, 10));
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let { x: { ...y } = $({ a: `fail` }) } = tmpParamBare;
  return y;
};
$(f({ x: { x: 1, y: 2, z: 3 }, b: 11, c: 12 }, 10));
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
  return y;
};
const tmpCallCallee = f;
const tmpObjLitVal = { x: 1, y: 2, z: 3 };
const tmpCalleeParam$7 = { x: tmpObjLitVal, b: 11, c: 12 };
const tmpCalleeParam$5 = tmpCallCallee(tmpCalleeParam$7, 10);
$(tmpCalleeParam$5);
`````

## Output


`````js filename=intro
const tmpObjLitVal /*:object*/ = { x: 1, y: 2, z: 3 };
const tmpCalleeParam$3 /*:array*/ = [];
const y /*:unknown*/ = objPatternRest(tmpObjLitVal, tmpCalleeParam$3, undefined);
$(y);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
  x: 1,
  y: 2,
  z: 3,
};
const b = [];
const c = objPatternRest( a, b, undefined );
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1', y: '2', z: '3' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
