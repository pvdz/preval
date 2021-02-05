# Preval test case

# obj.md

> normalize > pattern > param > _base > obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
({ x } = 1).foo
`````

## Normalized

`````js filename=intro
let tmpCompObj;
const tmpNestedAssignObjPatternRhs = 1;
x = tmpNestedAssignObjPatternRhs.x;
tmpCompObj = tmpNestedAssignObjPatternRhs;
tmpCompObj.foo;
`````

## Output

`````js filename=intro
let tmpCompObj;
x = (1).x;
tmpCompObj = 1;
tmpCompObj.foo;
`````

## Result

Should call `$` with:
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
