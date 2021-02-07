# Preval test case

# arr_obj.md

> normalize > pattern > param > _base > arr_obj
>
> Testing simple pattern normalizations. Make sure pattern bindings are properly renamed to be globally unique.

## Input

`````js filename=intro
{ let x = 1; }
([{ x }] = [{ x: 100 }]);
{ let x = 1; }
$(x);
`````

## Normalized

`````js filename=intro
{
  let x = 1;
}
const tmpArrElement = { x: 100 };
const arrAssignPatternRhs = [tmpArrElement];
const arrPatternSplat = [...arrAssignPatternRhs];
const arrPatternStep = arrPatternSplat[0];
x_1 = arrPatternStep.x;
arrAssignPatternRhs;
{
  let x_2 = 1;
}
$(x_1);
`````

## Output

`````js filename=intro
const tmpArrElement = { x: 100 };
const arrAssignPatternRhs = [tmpArrElement];
const arrPatternSplat = [...arrAssignPatternRhs];
const arrPatternStep = arrPatternSplat[0];
x_1_1 = arrPatternStep.x_1;
$(x_1_1);
`````

## Result

Should call `$` with:
 - 1: 100
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - 1: undefined
 - eval returned: undefined
