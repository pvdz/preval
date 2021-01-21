# Preval test case

# arr_obj.md

> normalize > pattern > param > _base > arr_obj
>
> Testing simple pattern normalizations. Make sure pattern bindings are properly renamed to be globally unique.

## Input

`````js filename=intro
{ let x = 1; }
([{ x }] = 1);
{ let x = 1; }
`````

## Normalized

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternStep;
{
  let x = 1;
}
arrAssignPatternRhs = 1;
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternStep = arrPatternSplat[0];
x_1 = arrPatternStep.x;
arrAssignPatternRhs;
{
  let x_2 = 1;
}
`````

## Output

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternStep;
arrAssignPatternRhs = 1;
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternStep = arrPatternSplat[0];
x_1 = arrPatternStep.x;
`````

## Result

Should call `$` with:
 - 0: <crash[ undefined is not a function ]>

Normalized calls: BAD?!
['<crash[ <ref> is not iterable ]>'];

Final output calls: BAD!!
['<crash[ <ref> is not iterable ]>'];

