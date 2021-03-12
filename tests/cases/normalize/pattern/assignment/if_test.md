# Preval test case

# if_test.md

> Normalize > Pattern > Assignment > If test
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
let y;
if (({ x } = 1)) y;
`````

## Pre Normal

`````js filename=intro
let y;
if (({ x } = 1)) y;
`````

## Normalized

`````js filename=intro
let y;
let tmpIfTest;
const tmpNestedAssignObjPatternRhs = 1;
x = tmpNestedAssignObjPatternRhs.x;
tmpIfTest = tmpNestedAssignObjPatternRhs;
`````

## Output

`````js filename=intro
x = (1).x;
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
