# Preval test case

# 1.md

> normalize > pattern > param > _base > 1
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
([ x = a ] = [1]);
`````

## Normalized

`````js filename=intro
const arrAssignPatternRhs = [1];
const arrPatternSplat = [...arrAssignPatternRhs];
const arrPatternBeforeDefault = arrPatternSplat[0];
const tmpIfTest = arrPatternBeforeDefault === undefined;
if (tmpIfTest) {
  x = a;
} else {
  x = arrPatternBeforeDefault;
}
arrAssignPatternRhs;
`````

## Output

`````js filename=intro
const arrAssignPatternRhs = [1];
const arrPatternSplat = [...arrAssignPatternRhs];
const arrPatternBeforeDefault = arrPatternSplat[0];
const tmpIfTest = arrPatternBeforeDefault === undefined;
if (tmpIfTest) {
  x = a;
} else {
  x = arrPatternBeforeDefault;
}
`````

## Result

Should call `$` with:
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
