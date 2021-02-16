# Preval test case

# 5.md

> normalize > pattern > param > _base > 5
>
> Testing simple pattern normalizations. Make sure pattern bindings are properly renamed to be globally unique.

## Input

`````js filename=intro
{ let x = 1; }
([[ x ]] = [[ 100 ]]);
{ let x = 1; }
$(x);
`````

## Normalized

`````js filename=intro
{
  let x = 1;
}
const tmpArrElement = [100];
const arrAssignPatternRhs = [tmpArrElement];
const arrPatternSplat = [...arrAssignPatternRhs];
const arrPatternStep = arrPatternSplat[0];
const arrPatternSplat$1 = [...arrPatternStep];
x_1 = arrPatternSplat$1[0];
{
  let x_2 = 1;
}
$(x_1);
`````

## Output

`````js filename=intro
const tmpArrElement = [100];
const arrAssignPatternRhs = [tmpArrElement];
const arrPatternSplat = [...arrAssignPatternRhs];
const arrPatternStep = arrPatternSplat[0];
const arrPatternSplat$1 = [...arrPatternStep];
x_1 = arrPatternSplat$1[0];
$(x_1);
`````

## Globals

BAD@! Found 1 implicit global bindings:

x_1

## Result

Should call `$` with:
 - 1: 100
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
