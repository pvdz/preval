# Preval test case

# default_yes_no__null.md

> normalize > pattern >  > param > obj > ident > default_yes_no__null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x = $('fail') }) {
  return 'bad';
}
$(f(null, 10));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let x = tmpParamPattern.x;
  if (x === undefined) {
    x = $('fail');
  }
  return 'bad';
}
var tmpArg;
tmpArg = f(null, 10);
$(tmpArg);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  let x = tmpParamPattern.x;
  if (x === undefined) {
    x = $('fail');
  }
  return 'bad';
}
var tmpArg;
tmpArg = f(null, 10);
$(tmpArg);
`````
