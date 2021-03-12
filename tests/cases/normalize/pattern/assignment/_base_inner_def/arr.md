# Preval test case

# arr.md

> Normalize > Pattern > Assignment > Base inner def > Arr
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
([ x = a ] = [1]);
`````

## Pre Normal

`````js filename=intro
[x = a] = [1];
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

## Globals

BAD@! Found 2 implicit global bindings:

a, x

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
