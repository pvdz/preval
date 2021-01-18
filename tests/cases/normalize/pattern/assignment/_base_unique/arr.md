# Preval test case

# 1.md

> normalize > pattern > param > _base > 1
>
> Testing simple pattern normalizations. Make sure pattern bindings are properly renamed to be globally unique.

## Input

`````js filename=intro
{ let x = 1; } 
([ x ] = 1);
{ let x = 1; }
`````

## Normalized

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
{
  let x = 1;
}
arrAssignPatternRhs = 1;
arrPatternSplat = [...arrAssignPatternRhs];
x_1 = arrPatternSplat[0];
arrAssignPatternRhs;
{
  let x_2 = 1;
}
`````

## Output

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
arrAssignPatternRhs = 1;
arrPatternSplat = [...arrAssignPatternRhs];
x_1 = arrPatternSplat[0];
`````

## Result

Should call `$` with:
['<crash[ undefined is not a function ]>'];

Normalized calls: BAD?!
['<crash[ <ref> is not iterable ]>'];

Final output calls: BAD!!
['<crash[ <ref> is not iterable ]>'];

