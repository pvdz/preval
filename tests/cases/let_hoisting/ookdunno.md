# Preval test case

# ookdunno.md

> Let hoisting > Ookdunno
>
> Property values check

The values were not checked leading to a inconsistent crash

## Input

`````js filename=intro
let f = function (tmpParamBare) {
  const tmpChainRootProp$1 = b;
};
const tmpObjLitVal = $;
let b = { x: tmpObjLitVal };
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  let tmpParamBare = $$0;
  debugger;
  const tmpChainRootProp$1 = b;
};
const tmpObjLitVal = $;
let b = { x: tmpObjLitVal };
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  let tmpParamBare = $$0;
  debugger;
  const tmpChainRootProp$1 = b;
  return undefined;
};
const tmpObjLitVal = $;
let b = { x: tmpObjLitVal };
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
