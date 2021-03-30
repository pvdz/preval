# Preval test case

# assign_pattern_prop.md

> Normalize > Expressions > Assign pattern prop
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
({ x } = 1).foo
`````

## Pre Normal

`````js filename=intro
({ x: x } = 1).foo;
`````

## Normalized

`````js filename=intro
let tmpCompObj = undefined;
const tmpNestedAssignObjPatternRhs = 1;
x = tmpNestedAssignObjPatternRhs.x;
tmpCompObj = tmpNestedAssignObjPatternRhs;
tmpCompObj.foo;
`````

## Output

`````js filename=intro
x = (1).x;
(1).foo;
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
