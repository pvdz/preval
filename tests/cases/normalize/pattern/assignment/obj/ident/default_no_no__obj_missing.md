# Preval test case

# default_no_no__obj_missing.md

> normalize > pattern >  > param > obj > ident > default_no_no__obj_missing
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x } = { b: 2, c: 3 });
$(x);
`````

## Normalized

`````js filename=intro
var objAssignPatternRhs;
objAssignPatternRhs = { b: 2, c: 3 };
x = objAssignPatternRhs.x;
$(x);
`````

## Output

`````js filename=intro
var objAssignPatternRhs;
objAssignPatternRhs = { b: 2, c: 3 };
x = objAssignPatternRhs.x;
$(x);
`````

## Result

Should call `$` with:
 - 0: null
 - 1: undefined

Normalized calls: Same

Final output calls: Same
