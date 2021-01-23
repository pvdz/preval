# Preval test case

# base.md

> normalize > pattern >  > param > obj > rest > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ a, b, ...x } = { x: 1, a: 2, b: 3, c: 4 });
$(x);
`````

## Normalized

`````js filename=intro
var objAssignPatternRhs;
var tmpArg;
var tmpArg$1;
objAssignPatternRhs = { x: 1, a: 2, b: 3, c: 4 };
a = objAssignPatternRhs.a;
b = objAssignPatternRhs.b;
tmpArg = objAssignPatternRhs;
tmpArg$1 = ['a', 'b'];
x = objPatternRest(tmpArg, tmpArg$1, 'x');
objAssignPatternRhs;
$(x);
`````

## Output

`````js filename=intro
var objAssignPatternRhs;
var tmpArg;
var tmpArg$1;
objAssignPatternRhs = { x: 1, a: 2, b: 3, c: 4 };
a = objAssignPatternRhs.a;
b = objAssignPatternRhs.b;
tmpArg = objAssignPatternRhs;
tmpArg$1 = ['a', 'b'];
x = objPatternRest(tmpArg, tmpArg$1, 'x');
$(x);
`````

## Result

Should call `$` with:
 - 0: {"x":1,"c":4}
 - 1: undefined

Normalized calls: Same

Final output calls: Same
