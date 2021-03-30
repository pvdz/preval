# Preval test case

# flash4.md

> Normalize > Pattern > Binding > Flash4
>
> Regression hunting

## Input

`````js filename=intro
function x({x}) {
  return x; 
}
x({x});
`````

## Pre Normal

`````js filename=intro
let x = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let { x: x$1 } = tmpParamBare;
  return x$1;
};
x({ x: x });
`````

## Normalized

`````js filename=intro
let x = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternObjRoot = tmpParamBare;
  let x$1 = bindingPatternObjRoot.x;
  return x$1;
};
const tmpCallCallee = x;
const tmpCalleeParam = { x: x };
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const x = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  const x$1 = tmpParamBare.x;
  return x$1;
};
const tmpCalleeParam = { x: x };
x(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
