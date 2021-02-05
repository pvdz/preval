# Preval test case

# base.md

> normalize > pattern >  > param > arr > obj > obj > ident > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([
  {
    x: { y },
  },
] = [{ x: { x: 1, y: 2, z: 3 }, y: 11 }, 10]);
$(y);
`````

## Normalized

`````js filename=intro
const tmpObjLitVal = { x: 1, y: 2, z: 3 };
const tmpArrElement = { x: tmpObjLitVal, y: 11 };
const arrAssignPatternRhs = [tmpArrElement, 10];
const arrPatternSplat = [...arrAssignPatternRhs];
const arrPatternStep = arrPatternSplat[0];
const objPatternNoDefault = arrPatternStep.x;
y = objPatternNoDefault.y;
arrAssignPatternRhs;
$(y);
`````

## Output

`````js filename=intro
const tmpObjLitVal = { x: 1, y: 2, z: 3 };
const tmpArrElement = { x: tmpObjLitVal, y: 11 };
const arrAssignPatternRhs = [tmpArrElement, 10];
const arrPatternSplat = [...arrAssignPatternRhs];
const arrPatternStep = arrPatternSplat[0];
const objPatternNoDefault = arrPatternStep.x;
y = objPatternNoDefault.y;
$(y);
`````

## Result

Should call `$` with:
 - 1: 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
