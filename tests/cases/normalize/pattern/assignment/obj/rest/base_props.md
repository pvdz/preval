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
const tmpAssignObjPatternRhs = { x: 1, a: 2, b: 3, c: 4 };
a = tmpAssignObjPatternRhs.a;
b = tmpAssignObjPatternRhs.b;
const tmpCallCallee = objPatternRest;
const tmpCalleeParam = tmpAssignObjPatternRhs;
const tmpCalleeParam$1 = ['a', 'b'];
const tmpCalleeParam$2 = 'x';
x = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$2);
$(x);
`````

## Output

`````js filename=intro
const tmpAssignObjPatternRhs = { x: 1, a: 2, b: 3, c: 4 };
a = tmpAssignObjPatternRhs.a;
b = tmpAssignObjPatternRhs.b;
const tmpCalleeParam$1 = ['a', 'b'];
x = objPatternRest(tmpAssignObjPatternRhs, tmpCalleeParam$1, 'x');
$(x);
`````

## Result

Should call `$` with:
 - 1: { x: '1', c: '4' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
