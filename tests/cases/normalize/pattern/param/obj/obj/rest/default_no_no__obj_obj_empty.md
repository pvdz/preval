# Preval test case

# default_no_no__obj_obj_empty.md

> Normalize > Pattern > Param > Obj > Obj > Rest > Default no no  obj obj empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f({ x: { ...y } }) {
  return y;
}
$(f({ x: {}, b: 11, c: 12 }, 10));
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let {
    x: { ...y },
  } = tmpParamBare;
  return y;
};
$(f({ x: {}, b: 11, c: 12 }, 10));
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternObjRoot = tmpParamBare;
  let objPatternNoDefault = bindingPatternObjRoot.x;
  const tmpCallCallee = objPatternRest;
  const tmpCalleeParam = objPatternNoDefault;
  const tmpCalleeParam$1 = [];
  const tmpCalleeParam$3 = undefined;
  let y = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$3);
  return y;
};
const tmpCallCallee$1 = $;
const tmpCallCallee$3 = f;
const tmpObjLitVal = {};
const tmpCalleeParam$7 = { x: tmpObjLitVal, b: 11, c: 12 };
const tmpCalleeParam$9 = 10;
const tmpCalleeParam$5 = tmpCallCallee$3(tmpCalleeParam$7, tmpCalleeParam$9);
tmpCallCallee$1(tmpCalleeParam$5);
`````

## Output


`````js filename=intro
const tmpObjLitVal /*:object*/ = {};
const tmpCalleeParam$1 /*:array*/ = [];
const y /*:unknown*/ = objPatternRest(tmpObjLitVal, tmpCalleeParam$1, undefined);
$(y);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {};
const b = [];
const c = objPatternRest( a, b, undefined );
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
