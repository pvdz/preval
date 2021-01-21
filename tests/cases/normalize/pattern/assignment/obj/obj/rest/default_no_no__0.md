# Preval test case

# default_no_no__0.md

> normalize > pattern >  > param > obj > obj > rest > default_no_no__0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x: { ...y } } = 0);
$('bad');
`````

## Normalized

`````js filename=intro
var objAssignPatternRhs;
var objPatternNoDefault;
objAssignPatternRhs = 0;
objPatternNoDefault = objAssignPatternRhs.x;
y = objPatternRest(objPatternNoDefault, [], undefined);
$('bad');
`````

## Output

`````js filename=intro
var objAssignPatternRhs;
var objPatternNoDefault;
objAssignPatternRhs = 0;
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

