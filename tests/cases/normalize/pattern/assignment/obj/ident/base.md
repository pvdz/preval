# Preval test case

# base.md

> normalize > pattern >  > param > obj > ident > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x } = { x: 1, b: 2, c: 3 });
$(x);
`````

## Normalized

`````js filename=intro
var objAssignPatternRhs;
var x;
objAssignPatternRhs = objAssignPatternRhs = { x: 1, b: 2, c: 3 };
x = objAssignPatternRhs.x;
$(x);
`````

## Output

`````js filename=intro
var objAssignPatternRhs;
var x;
objAssignPatternRhs = objAssignPatternRhs = { x: 1, b: 2, c: 3 };
x = objAssignPatternRhs.x;
$(x);
`````
