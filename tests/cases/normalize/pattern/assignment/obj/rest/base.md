# Preval test case

# base.md

> normalize > pattern >  > param > obj > rest > base
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
x = objPatternRest(objAssignPatternRhs, [], 'x');
$(x);
`````

## Output

`````js filename=intro
var objAssignPatternRhs;
objAssignPatternRhs = { x: 1, b: 2, c: 3 };
x = objPatternRest(objAssignPatternRhs, [], 'x');
$(x);
`````

## Result

Should call `$` with:
 - 0: {"x":1,"b":2,"c":3}
 - 1: undefined

Normalized calls: Same

Final output calls: Same
