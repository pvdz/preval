# Preval test case

# default_no_no__undefined.md

> normalize > pattern >  > param > obj > rest > default_no_no__undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ ...x } = undefined);
$(x);
`````

## Normalized

`````js filename=intro
var objAssignPatternRhs;
objAssignPatternRhs = undefined;
x = objPatternRest(objAssignPatternRhs, []);
$(x);
`````

## Output

`````js filename=intro
var objAssignPatternRhs;
objAssignPatternRhs = undefined;
x = objPatternRest(objAssignPatternRhs, []);
$(x);
`````

## Result

Should call `$` with:
["<crash[ Cannot destructure 'undefined' as it is undefined. ]>"];

Normalized calls: BAD?!
[[{}], null];

Final output calls: BAD!!
[[{}], null];

