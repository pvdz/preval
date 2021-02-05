# Preval test case

# obj_obj.md

> normalize > pattern > param > _base > obj_obj
>
> Testing simple pattern normalizations. Make sure pattern bindings are properly renamed to be globally unique.

## Input

`````js filename=intro
let z = 1;
function i({x: {y: {z}}}) {
  { let z = 2; }
  return z
}
`````

## Normalized

`````js filename=intro
function i(tmpParamPattern) {
  let objPatternNoDefault = tmpParamPattern.x;
  let objPatternNoDefault$1 = objPatternNoDefault.y;
  let z_1 = objPatternNoDefault$1.z;
  {
    let z_2 = 2;
  }
  return z_1;
}
let z = 1;
('<hoisted func decl `i`>');
`````

## Output

`````js filename=intro

`````

## Result

Should call `$` with:
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
