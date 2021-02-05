# Preval test case

# base.md

> normalize > pattern >  > param > obj > arr > obj > rest > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: [{ ...y }] } = { x: [{ x: 1, y: 2, c: 3 }, 13, 14], a: 11, b: 12 };
$(y);
`````

## Normalized

`````js filename=intro
const tmpArrElement = { x: 1, y: 2, c: 3 };
const tmpObjLitVal = [tmpArrElement, 13, 14];
const bindingPatternObjRoot = { x: tmpObjLitVal, a: 11, b: 12 };
const objPatternNoDefault = bindingPatternObjRoot.x;
const arrPatternSplat = [...objPatternNoDefault];
const arrPatternStep = arrPatternSplat[0];
const tmpCallCallee = objPatternRest;
const tmpCalleeParam = arrPatternStep;
const tmpCalleeParam$1 = [];
const tmpCalleeParam$2 = undefined;
const y = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$2);
$(y);
`````

## Output

`````js filename=intro
const tmpArrElement = { x: 1, y: 2, c: 3 };
const tmpObjLitVal = [tmpArrElement, 13, 14];
const bindingPatternObjRoot = { x: tmpObjLitVal, a: 11, b: 12 };
const objPatternNoDefault = bindingPatternObjRoot.x;
const arrPatternSplat = [...objPatternNoDefault];
const arrPatternStep = arrPatternSplat[0];
const tmpCallCallee = objPatternRest;
const tmpCalleeParam = arrPatternStep;
const tmpCalleeParam$1 = [];
const y = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, undefined);
$(y);
`````

## Result

Should call `$` with:
 - 1: { x: '1', y: '2', c: '3' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
