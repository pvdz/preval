# Preval test case

# default_no_no__empty.md

> normalize > pattern >  > param > obj > obj > rest > default_no_no__empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: { ...y } } = 1;
$('bad');
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = 1;
const objPatternNoDefault = bindingPatternObjRoot.x;
const y = objPatternRest(objPatternNoDefault, [], undefined);
$('bad');
`````

## Output

`````js filename=intro
const objPatternNoDefault = (1).x;
objPatternRest(objPatternNoDefault, [], undefined);
$('bad');
`````

## Result

Should call `$` with:
 - 0: <crash[ Cannot read property 'undefined' of undefined ]>

Normalized calls: BAD?!
["<crash[ Cannot read property 'cannotDestructureThis' of undefined ]>"];

Final output calls: BAD!!
["<crash[ Cannot read property 'cannotDestructureThis' of undefined ]>"];

