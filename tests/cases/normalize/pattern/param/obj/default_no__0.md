# Preval test case

# default_no__0.md

> normalize > pattern >  > param > obj > default_no__0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({}) {
  return 'ok';
}
$(f(0, 10));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  return 'ok';
}
var tmpArg;
tmpArg = f(0, 10);
$(tmpArg);
`````

## Uniformed

`````js filename=intro
function x(x) {
  return 'str';
}
var x;
x = x(8, 8);
x(x);
`````

## Output

`````js filename=intro
var tmpArg;
tmpArg = 'ok';
$(tmpArg);
`````
