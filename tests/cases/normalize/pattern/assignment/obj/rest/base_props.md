# Preval test case

# base_props.md

> Normalize > Pattern > Assignment > Obj > Rest > Base props
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ a, b, ...x } = { x: 1, a: 2, b: 3, c: 4 });
$(x);
`````

## Pre Normal

`````js filename=intro
({ a: a, b: b, ...x } = { x: 1, a: 2, b: 3, c: 4 });
$(x);
`````

## Normalized

`````js filename=intro
const tmpAssignObjPatternRhs = { x: 1, a: 2, b: 3, c: 4 };
a = tmpAssignObjPatternRhs.a;
b = tmpAssignObjPatternRhs.b;
const tmpCallCallee = objPatternRest;
const tmpCalleeParam = tmpAssignObjPatternRhs;
const tmpCalleeParam$1 = ['a', 'b'];
const tmpCalleeParam$3 = 'x';
x = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$3);
$(x);
`````

## Output

`````js filename=intro
const tmpAssignObjPatternRhs = { x: 1, a: 2, b: 3, c: 4 };
a = 2;
b = 3;
const tmpCalleeParam$1 = ['a', 'b'];
x = objPatternRest(tmpAssignObjPatternRhs, tmpCalleeParam$1, 'x');
$(x);
`````

## Globals

BAD@! Found 3 implicit global bindings:

a, b, x

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
