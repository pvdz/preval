# Preval test case

# default_no_no__undefined.md

> normalize > pattern >  > param > obj > ident > default_no_no__undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x } = undefined);
$('bad');
`````

## Normalized

`````js filename=intro
var objAssignPatternRhs;
var x;
objAssignPatternRhs = undefined;
x = objAssignPatternRhs.x;
$('bad');
`````

## Uniformed

`````js filename=intro
var x;
var x;
x = x;
x = x.x;
x('str');
`````

## Output

`````js filename=intro
var objAssignPatternRhs;
var x;
objAssignPatternRhs = undefined;
x = objAssignPatternRhs.x;
$('bad');
`````
