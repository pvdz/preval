# Preval test case

# default_no_no__empty_str.md

> normalize > pattern >  > param > obj > obj > default_no_no__empty_str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: {} }) {
  return 'bad';
}
$(f('', 10));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let objPatternNoDefault = tmpParamPattern.x;
  return 'bad';
}
var tmpArg;
tmpArg = f('', 10);
$(tmpArg);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  return 'bad';
}
var tmpArg;
tmpArg = f('', 10);
$(tmpArg);
`````