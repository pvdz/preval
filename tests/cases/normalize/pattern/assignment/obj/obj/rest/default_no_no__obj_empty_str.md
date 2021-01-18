# Preval test case

# default_no_no__obj_empty_str.md

> normalize > pattern >  > param > obj > obj > rest > default_no_no__obj_empty_str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x: { ...y } } = { x: '', b: 11, c: 12 });
$(y);
`````

## Normalized

`````js filename=intro
var objAssignPatternRhs;
var objPatternNoDefault;
objAssignPatternRhs = { x: '', b: 11, c: 12 };
objPatternNoDefault = objAssignPatternRhs.x;
y = objPatternRest(objPatternNoDefault, []);
$(y);
`````

## Output

`````js filename=intro
var objAssignPatternRhs;
var objPatternNoDefault;
objAssignPatternRhs = { x: '', b: 11, c: 12 };
objPatternNoDefault = objAssignPatternRhs.x;
y = objPatternRest(objPatternNoDefault, []);
$(y);
`````

## Result

Should call `$` with:
[[{}], null];

Normalized calls: BAD?!
['<crash[ <ref> is not defined ]>'];

Final output calls: BAD!!
['<crash[ <ref> is not defined ]>'];

