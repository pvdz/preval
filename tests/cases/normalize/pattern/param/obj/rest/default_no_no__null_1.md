# Preval test case

# default_no_no__null.md

> normalize > pattern >  > param > obj > rest > default_no_no__null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ ...x }) {
  return 'bad';
}
f(null);
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let x = objPatternRest(tmpParamPattern, [], undefined);
  return 'bad';
}
f(null);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  objPatternRest(tmpParamPattern, [], undefined);
  return 'bad';
}
f(null);
`````

## Result

Should call `$` with:
 - 0: <crash[ Cannot read property 'cannotDestructureThis' of null ]>

Normalized calls: Same

Final output calls: Same
