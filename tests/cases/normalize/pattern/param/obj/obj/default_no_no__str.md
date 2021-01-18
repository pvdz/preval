# Preval test case

# default_no_no__str.md

> normalize > pattern >  > param > obj > obj > default_no_no__str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: {} }) {
  return 'bad';
}
$(f('abc', 10));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let objPatternNoDefault = tmpParamPattern.x;
  return 'bad';
}
var tmpArg;
tmpArg = f('abc', 10);
$(tmpArg);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  tmpParamPattern.x;
  return 'bad';
}
var tmpArg;
tmpArg = f('abc', 10);
$(tmpArg);
`````

## Result

Should call `$` with:
["<crash[ Cannot destructure property 'x' of 'undefined' as it is undefined. ]>"];

Normalized calls: BAD?!
[['bad'], null];

Final output calls: BAD!!
[['bad'], null];

