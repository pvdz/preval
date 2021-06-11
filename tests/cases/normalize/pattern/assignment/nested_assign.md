# Preval test case

# nested_assign.md

> Normalize > Pattern > Assignment > Nested assign
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
let y;
y = { x } = { x: 1 };
$(y);
`````

## Pre Normal

`````js filename=intro
let y;
y = { x: x } = { x: 1 };
$(y);
`````

## Normalized

`````js filename=intro
let y = undefined;
const tmpNestedAssignObjPatternRhs = { x: 1 };
x = tmpNestedAssignObjPatternRhs.x;
y = tmpNestedAssignObjPatternRhs;
$(y);
`````

## Output

`````js filename=intro
x = 1;
const tmpNestedAssignObjPatternRhs = { x: 1 };
$(tmpNestedAssignObjPatternRhs);
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
