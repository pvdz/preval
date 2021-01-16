# Preval test case

# default_no_no__obj_empty_str.md

> normalize > pattern >  > param > obj > obj > default_no_no__obj_empty_str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: {} }) {
  return 'ok';
}
$(f({ x: '', b: 11, c: 12 }, 10));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let objPatternNoDefault = tmpParamPattern.x;
  return 'ok';
}
var tmpArg;
var tmpArg_1;
tmpArg_1 = { x: '', b: 11, c: 12 };
tmpArg = f(tmpArg_1, 10);
$(tmpArg);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  tmpParamPattern.x;
  return 'ok';
}
var tmpArg;
var tmpArg_1;
tmpArg_1 = { x: '', b: 11, c: 12 };
tmpArg = f(tmpArg_1, 10);
$(tmpArg);
`````
