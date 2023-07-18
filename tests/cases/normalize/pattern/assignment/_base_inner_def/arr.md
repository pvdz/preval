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
x = 1;
`````

## PST Output

With rename=true

`````js filename=intro
x = 1;
`````

## Globals

BAD@! Found 1 implicit global bindings:

x

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
