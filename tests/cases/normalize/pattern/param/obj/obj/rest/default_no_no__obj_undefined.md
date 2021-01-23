# Preval test case

# default_no_no__obj_undefined.md

> normalize > pattern >  > param > obj > obj > rest > default_no_no__obj_undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: { ...y } }) {
  return 'bad';
}
$(f({ x: undefined, b: 11, c: 12 }, 10));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let objPatternNoDefault = tmpParamPattern.x;
  let y = objPatternRest(objPatternNoDefault, [], undefined);
  return 'bad';
}
var tmpArg;
var tmpArg$1;
('<hoisted var `tmpArg` decl without init>');
('<hoisted var `tmpArg$1` decl without init>');
('<hoisted var `tmpArg` decl without init>');
('<hoisted var `tmpArg$1` decl without init>');
tmpArg$1 = { x: undefined, b: 11, c: 12 };
tmpArg = f(tmpArg$1, 10);
$(tmpArg);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  let objPatternNoDefault = tmpParamPattern.x;
  objPatternRest(objPatternNoDefault, [], undefined);
  return 'bad';
}
var tmpArg;
var tmpArg$1;
tmpArg$1 = { x: undefined, b: 11, c: 12 };
tmpArg = f(tmpArg$1, 10);
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: <crash[ Cannot read property 'undefined' of undefined ]>

Normalized calls: BAD?!
["<crash[ Cannot read property 'cannotDestructureThis' of undefined ]>"];

Final output calls: BAD!!
["<crash[ Cannot read property 'cannotDestructureThis' of undefined ]>"];

