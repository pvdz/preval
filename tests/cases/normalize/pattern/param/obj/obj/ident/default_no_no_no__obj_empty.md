# Preval test case

# default_no_no_no__obj_empty.md

> normalize > pattern >  > param > obj > obj > ident > default_no_no_no__obj_empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: { y } }) {
  return 'bad';
}
$(f({}, 10));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let objPatternNoDefault = tmpParamPattern.x;
  let y = objPatternNoDefault.y;
  return 'bad';
}
var tmpArg;
tmpArg = f({}, 10);
$(tmpArg);
`````

## Uniformed

`````js filename=intro
function x(x) {
  var x = x.x;
  var x = x.x;
  return 'str';
}
var x;
x = x({}, 8);
x(x);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  let objPatternNoDefault = tmpParamPattern.x;
  objPatternNoDefault.y;
  return 'bad';
}
var tmpArg;
tmpArg = f({}, 10);
$(tmpArg);
`````
