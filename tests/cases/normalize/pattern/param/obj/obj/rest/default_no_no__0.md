# Preval test case

# default_no_no__0.md

> normalize > pattern >  > param > obj > obj > rest > default_no_no__0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: { ...y } }) {
  return 'bad';
}
$(f(0, 10));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let objPatternNoDefault = tmpParamPattern.x;
  let y = objPatternRest(objPatternNoDefault, []);
  return 'bad';
}
var tmpArg;
tmpArg = f(0, 10);
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
tmpArg = f(0, 10);
$(tmpArg);
`````

## Result

Should call `$` with:
["<crash[ Cannot read property 'undefined' of undefined ]>"];

Normalized calls: BAD?!
['<crash[ <ref> is not defined ]>'];

Final output calls: BAD!!
['<crash[ <ref> is not defined ]>'];

