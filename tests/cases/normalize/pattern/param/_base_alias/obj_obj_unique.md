# Preval test case

# obj.md

> normalize > pattern > param > _base > obj
>
> Testing simple pattern normalizations. Make sure pattern bindings are properly renamed to be globally unique.

Confirm that both references of `x` get a unique name.

In particular, the pattern's "y" should be replaced with a different name.

## Input

`````js filename=intro
let a = 1;
function i({x: {y: {z: a}}}) {
  {
    let a = 2;
  }
  return a;
}
$(i({x: {y: {z: {a: 10}}}}));
`````

## Normalized

`````js filename=intro
function i(tmpParamPattern) {
  let objPatternNoDefault = tmpParamPattern.x;
  let objPatternNoDefault$1 = objPatternNoDefault.y;
  let a_1 = objPatternNoDefault$1.z;
  {
    let a_2 = 2;
  }
  return a_1;
}
var tmpArg;
var tmpArg$1;
var tmpObjPropValue;
var tmpObjPropValue$1;
var tmpObjPropValue$2;
('<hoisted func decl `i`>');
let a = 1;
('<hoisted func decl `i`>');
tmpObjPropValue$2 = { a: 10 };
tmpObjPropValue$1 = { z: tmpObjPropValue$2 };
tmpObjPropValue = { y: tmpObjPropValue$1 };
tmpArg$1 = { x: tmpObjPropValue };
tmpArg = i(tmpArg$1);
$(tmpArg);
`````

## Output

`````js filename=intro
function i(tmpParamPattern) {
  let objPatternNoDefault = tmpParamPattern.x;
  let objPatternNoDefault$1 = objPatternNoDefault.y;
  let a_1 = objPatternNoDefault$1.z;
  return a_1;
}
var tmpArg;
var tmpArg$1;
var tmpObjPropValue;
var tmpObjPropValue$1;
var tmpObjPropValue$2;
tmpObjPropValue$2 = { a: 10 };
tmpObjPropValue$1 = { z: tmpObjPropValue$2 };
tmpObjPropValue = { y: tmpObjPropValue$1 };
tmpArg$1 = { x: tmpObjPropValue };
tmpArg = i(tmpArg$1);
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: {"a":10}
 - 1: undefined

Normalized calls: Same

Final output calls: Same
