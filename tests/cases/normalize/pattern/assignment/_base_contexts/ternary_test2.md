# Preval test case

# ternary_test2.md

> Normalize > Pattern > Assignment > Base contexts > Ternary test2
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
let x, b, c
({ x } = 1) ? b : c;
`````

## Pre Normal

`````js filename=intro
let x, b, c;
({ x: x } = 1) ? b : c;
`````

## Normalized

`````js filename=intro
let x = undefined;
let b = undefined;
let c = undefined;
let tmpIfTest = undefined;
const tmpNestedAssignObjPatternRhs = 1;
x = tmpNestedAssignObjPatternRhs.x;
tmpIfTest = tmpNestedAssignObjPatternRhs;
`````

## Output

`````js filename=intro
(1).x;
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
