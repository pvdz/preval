# Preval test case

# ternary_test.md

> Normalize > Pattern > Assignment > Base contexts > Ternary test
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
let x = 1, b = 2, c = 3;
({ x } = 1) ? b : c;
`````

## Pre Normal

`````js filename=intro
let x = 1,
  b = 2,
  c = 3;
({ x: x } = 1) ? b : c;
`````

## Normalized

`````js filename=intro
let x = 1;
let b = 2;
let c = 3;
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
