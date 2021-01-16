# Preval test case

# default_no_no__obj_missing.md

> normalize > pattern >  > param > obj > obj > rest > default_no_no__obj_missing
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: { ...y } }) {
  return 'bad';
}
$(f({ b: 11, c: 12 }, 10));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let objPatternNoDefault = tmpParamPattern.x;
  let y = objPatternRest(objPatternNoDefault, []);
  return 'bad';
}
var tmpArg;
var tmpArg_1;
tmpArg_1 = { b: 11, c: 12 };
tmpArg = f(tmpArg_1, 10);
$(tmpArg);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  let objPatternNoDefault = tmpParamPattern.x;
  objPatternRest(objPatternNoDefault, []);
  return 'bad';
}
var tmpArg;
var tmpArg_1;
tmpArg_1 = { b: 11, c: 12 };
tmpArg = f(tmpArg_1, 10);
$(tmpArg);
`````
