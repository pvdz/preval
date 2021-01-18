# Preval test case

# default_no__null.md

> normalize > pattern >  > param > obj > default_no__null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({}) {
  return 'bad';
}
$(f(null, 10));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  return 'bad';
}
var tmpArg;
tmpArg = f(null, 10);
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
tmpArg = 'bad';
$(tmpArg);
`````

## Result

Should call `$` with:
["<crash[ Cannot destructure 'object null' as it is null. ]>"];

Normalized calls: BAD?!
[['bad'], null];

Final output calls: BAD!!
[['bad'], null];

