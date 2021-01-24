# Preval test case

# default_no_no_no__obj_obj_null.md

> normalize > pattern >  > param > obj > obj > ident > default_no_no_no__obj_obj_null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: { y } }) {
  return y;
}
$(f({ x: { x: 1, y: null, z: 3 }, b: 11, c: 12 }, 10));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let objPatternNoDefault = tmpParamPattern.x;
  let y = objPatternNoDefault.y;
  return y;
}
var tmpArg;
var tmpArg$1;
var tmpObjPropValue;
('<hoisted func decl `f`>');
tmpObjPropValue = { x: 1, y: null, z: 3 };
tmpArg$1 = { x: tmpObjPropValue, b: 11, c: 12 };
tmpArg = f(tmpArg$1, 10);
$(tmpArg);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  let objPatternNoDefault = tmpParamPattern.x;
  let y = objPatternNoDefault.y;
  return y;
}
var tmpArg;
var tmpArg$1;
var tmpObjPropValue;
tmpObjPropValue = { x: 1, y: null, z: 3 };
tmpArg$1 = { x: tmpObjPropValue, b: 11, c: 12 };
tmpArg = f(tmpArg$1, 10);
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: null
 - 1: undefined

Normalized calls: Same

Final output calls: Same
