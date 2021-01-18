# Preval test case

# default_no_no__obj_123.md

> normalize > pattern >  > param > obj > rest > default_no_no__obj_123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ ...x } = { x: 1, b: 2, c: 3 });
$(x);
`````

## Normalized

`````js filename=intro
var objAssignPatternRhs;
objAssignPatternRhs = { x: 1, b: 2, c: 3 };
x = objPatternRest(objAssignPatternRhs, []);
$(x);
`````

## Output

`````js filename=intro
var objAssignPatternRhs;
objAssignPatternRhs = { x: 1, b: 2, c: 3 };
x = objPatternRest(objAssignPatternRhs, []);
$(x);
`````

## Result

Should call `$` with:
[[{ x: 1, b: 2, c: 3 }], null];

Normalized calls: BAD?!
['<crash[ <ref> is not defined ]>'];

Final output calls: BAD!!
['<crash[ <ref> is not defined ]>'];

