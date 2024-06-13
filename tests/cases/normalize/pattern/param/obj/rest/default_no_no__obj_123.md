# Preval test case

# default_no_no__obj_123.md

> Normalize > Pattern > Param > Obj > Rest > Default no no  obj 123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ ...x } = $({ a: 'fail' })) {
  return x;
}
$(f({ x: 1, b: 2, c: 3 }, 10));
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let { ...x } = tmpParamBare === undefined ? $({ a: `fail` }) : tmpParamBare;
  return x;
};
$(f({ x: 1, b: 2, c: 3 }, 10));
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternObjRoot = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    const tmpCallCallee = $;
    const tmpCalleeParam = { a: `fail` };
    bindingPatternObjRoot = tmpCallCallee(tmpCalleeParam);
  } else {
    bindingPatternObjRoot = tmpParamBare;
  }
  const tmpCallCallee$1 = objPatternRest;
  const tmpCalleeParam$1 = bindingPatternObjRoot;
  const tmpCalleeParam$3 = [];
  const tmpCalleeParam$5 = `x`;
  let x = tmpCallCallee$1(tmpCalleeParam$1, tmpCalleeParam$3, tmpCalleeParam$5);
  return x;
};
const tmpCallCallee$3 = $;
const tmpCallCallee$5 = f;
const tmpCalleeParam$9 = { x: 1, b: 2, c: 3 };
const tmpCalleeParam$11 = 10;
const tmpCalleeParam$7 = tmpCallCallee$5(tmpCalleeParam$9, tmpCalleeParam$11);
tmpCallCallee$3(tmpCalleeParam$7);
`````

## Output


`````js filename=intro
const tmpCalleeParam$9 = { x: 1, b: 2, c: 3 };
const tmpCalleeParam$3 = [];
const x = objPatternRest(tmpCalleeParam$9, tmpCalleeParam$3, `x`);
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
