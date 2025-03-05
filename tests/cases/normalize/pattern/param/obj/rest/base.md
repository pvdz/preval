# Preval test case

# base.md

> Normalize > Pattern > Param > Obj > Rest > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f({ ...x }) {
  return x;
}
$(f({ x: 1, b: 2, c: 3 }, 10));
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let { ...x } = tmpParamBare;
  return x;
};
$(f({ x: 1, b: 2, c: 3 }, 10));
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternObjRoot = tmpParamBare;
  const tmpCalleeParam = bindingPatternObjRoot;
  const tmpCalleeParam$1 = [];
  let x = objPatternRest(tmpCalleeParam, tmpCalleeParam$1, `x`);
  return x;
};
const tmpCallCallee = f;
const tmpCalleeParam$5 = { x: 1, b: 2, c: 3 };
const tmpCalleeParam$3 = tmpCallCallee(tmpCalleeParam$5, 10);
$(tmpCalleeParam$3);
`````

## Output


`````js filename=intro
const tmpCalleeParam$5 /*:object*/ = { x: 1, b: 2, c: 3 };
const tmpCalleeParam$1 /*:array*/ = [];
const x /*:unknown*/ = objPatternRest(tmpCalleeParam$5, tmpCalleeParam$1, `x`);
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
  x: 1,
  b: 2,
  c: 3,
};
const b = [];
const c = objPatternRest( a, b, "x" );
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1', b: '2', c: '3' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
