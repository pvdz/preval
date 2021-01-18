# Preval test case

# default_no_no__0.md

> normalize > pattern >  > param > obj > rest > default_no_no__0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ ...x } = 0);
$(x);
`````

## Normalized

`````js filename=intro
var objAssignPatternRhs;
objAssignPatternRhs = 0;
x = objPatternRest(objAssignPatternRhs, []);
$(x);
`````

## Output

`````js filename=intro
var objAssignPatternRhs;
objAssignPatternRhs = 0;
x = objPatternRest(objAssignPatternRhs, []);
$(x);
`````

## Result

Should call `$` with:
[[{}], null];

Normalized calls: BAD?!
['<crash[ <ref> is not defined ]>'];

Final output calls: BAD!!
['<crash[ <ref> is not defined ]>'];

