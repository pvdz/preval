# Preval test case

# default_no_no__obj_empty.md

> normalize > pattern >  > param > obj > rest > default_no_no__obj_empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ ...x } = {});
$(x);
`````

## Normalized

`````js filename=intro
var objAssignPatternRhs;
var x;
objAssignPatternRhs = objAssignPatternRhs = {};
x = objPatternRest(objAssignPatternRhs, []);
$(x);
`````

## Output

`````js filename=intro
var objAssignPatternRhs;
var x;
objAssignPatternRhs = objAssignPatternRhs = {};
x = objPatternRest(objAssignPatternRhs, []);
$(x);
`````
