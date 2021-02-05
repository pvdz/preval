# Preval test case

# 1.md

> normalize > pattern > param > _base > 1
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
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let x = arrPatternSplat[0];
  {
    let x_2 = 2;
  }
  return x;
}
let x = 1;
('<hoisted func decl `f`>');
`````

## Output

`````js filename=intro

`````

## Result

Should call `$` with:
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
