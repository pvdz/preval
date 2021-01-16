# Preval test case

# default_no__undefined.md

> normalize > pattern >  > param > obj > default_no__undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({}) {
  return 'bad';
}
$(f(undefined, 10));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  return 'bad';
}
var tmpArg;
tmpArg = f(undefined, 10);
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
tmpArg = 'bad';
$(tmpArg);
`````
