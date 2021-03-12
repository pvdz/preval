# Preval test case

# arr.md

> Normalize > Pattern > Param > Base unique > Arr
>
> Testing simple pattern normalizations. Make sure pattern bindings are properly renamed to be globally unique.

## Input

`````js filename=intro
let x = 1;
function f([ x ]) {
  { let x = 2; }
  return x
}
`````

## Normalized

`````js filename=intro
let f = function (tmpParamPattern) {
  let bindingPatternArrRoot = tmpParamPattern;
  let arrPatternSplat = [...bindingPatternArrRoot];
  let x$1 = arrPatternSplat[0];
  let x$2 = 2;
  return x$1;
};
let x = 1;
`````

## Output

`````js filename=intro

`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
