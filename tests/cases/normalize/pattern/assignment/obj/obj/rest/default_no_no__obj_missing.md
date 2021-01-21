# Preval test case

# default_no_no__obj_missing.md

> normalize > pattern >  > param > obj > obj > rest > default_no_no__obj_missing
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x: { ...y } } = { b: 11, c: 12 });
$('bad');
`````

## Normalized

`````js filename=intro
var objAssignPatternRhs;
var objPatternNoDefault;
objAssignPatternRhs = { b: 11, c: 12 };
objPatternNoDefault = objAssignPatternRhs.x;
y = objPatternRest(objPatternNoDefault, [], undefined);
$('bad');
`````

## Output

`````js filename=intro
var objAssignPatternRhs;
var objPatternNoDefault;
objAssignPatternRhs = { b: 11, c: 12 };
objPatternNoDefault = objAssignPatternRhs.x;
y = objPatternRest(objPatternNoDefault, [], undefined);
$('bad');
`````

## Result

Should call `$` with:
 - 0: <crash[ Cannot read property 'undefined' of undefined ]>

Normalized calls: BAD?!
["<crash[ Cannot read property 'cannotDestructureThis' of undefined ]>"];

Final output calls: BAD!!
["<crash[ Cannot read property 'cannotDestructureThis' of undefined ]>"];

