# Preval test case

# base.md

> normalize > pattern >  > param > obj > arr > obj > ident > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x: [{ y }] } = { x: [{ x: 1, y: 2, c: 3 }, 13, 14], a: 11, b: 12 });
$(y);
`````

## Normalized

`````js filename=intro
const tmpArrElement = { x: 1, y: 2, c: 3 };
const tmpObjLitVal = [tmpArrElement, 13, 14];
const tmpAssignObjPatternRhs = { x: tmpObjLitVal, a: 11, b: 12 };
const objPatternNoDefault = tmpAssignObjPatternRhs.x;
const arrPatternSplat = [...objPatternNoDefault];
const arrPatternStep = arrPatternSplat[0];
y = arrPatternStep.y;
$(y);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
