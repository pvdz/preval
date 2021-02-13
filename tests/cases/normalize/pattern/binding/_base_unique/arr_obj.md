# Preval test case

# arr_obj.md

> normalize > pattern > param > _base > arr_obj
>
> Testing simple pattern normalizations. Make sure pattern bindings are properly renamed to be globally unique.

## Input

`````js filename=intro
{ let x = 1; }
const [{ x }] = [{ x: 100}];
{ let x = 1; }
$(x);
`````

## Normalized

`````js filename=intro
{
  let x_1 = 1;
}
const tmpArrElement = { x: 100 };
const bindingPatternArrRoot = [tmpArrElement];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const x = arrPatternStep.x;
{
  let x_2 = 1;
}
$(x);
`````

## Output

`````js filename=intro
{
}
const tmpArrElement = { x: 100 };
const bindingPatternArrRoot = [tmpArrElement];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const x = arrPatternStep.x;
{
}
$(x);
`````

## Result

Should call `$` with:
 - 1: 100
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
