# Preval test case

# default_no__empty_str.md

> normalize > pattern >  > param > obj > default_no__empty_str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({}) {
  return 'ok';
}
$(f('', 10));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  return 'ok';
}
var tmpArg;
tmpArg = f('', 10);
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
tmpArg = 'ok';
$(tmpArg);
`````

## Result

Should call `$` with:
[['ok'], null];

Normalized calls: Same

Final output calls: Same
