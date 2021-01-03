# Preval test case

# default_no_no__empty_str.md

> normalize > pattern >  > param > obj > ident > default_no_no__empty_str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x } = '');
$(x);
`````

## Normalized

`````js filename=intro
var objAssignPatternRhs;
var x;
objAssignPatternRhs = '';
x = objAssignPatternRhs.x;
$(x);
`````

## Output

`````js filename=intro
var objAssignPatternRhs;
var x;
objAssignPatternRhs = '';
x = objAssignPatternRhs.x;
$(x);
`````
