# Preval test case

# obj_unique.md

> Normalize > Pattern > Param > Base alias > Obj unique
>
> Testing simple pattern normalizations. Make sure pattern bindings are properly renamed to be globally unique.

Confirm that both references of `x` get a unique name.

In particular, the pattern's "y" should be replaced with a different name.

## Input

`````js filename=intro
let y = 1;
function g({ x: y }) {
  {
    let y = 2;
  }
  return y;
}
`````

## Pre Normal


`````js filename=intro
let g = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let { x: y$1 } = tmpParamBare;
  {
    let y$3 = 2;
  }
  return y$1;
};
let y = 1;
`````

## Normalized


`````js filename=intro
let g = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternObjRoot = tmpParamBare;
  let y$1 = bindingPatternObjRoot.x;
  let y$3 = 2;
  return y$1;
};
let y = 1;
`````

## Output


`````js filename=intro

`````

## PST Output

With rename=true

`````js filename=intro

`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
