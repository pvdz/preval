# Preval test case

# obj.md

> normalize > pattern > param > _base > obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
let y;
if (({ x } = 1).foo) y;
`````

## Normalized

`````js filename=intro
let y;
let tmpCompObj;
const tmpNestedAssignObjPatternRhs = 1;
x = tmpNestedAssignObjPatternRhs.x;
tmpCompObj = tmpNestedAssignObjPatternRhs;
const tmpIfTest = tmpCompObj.foo;
`````

## Output

`````js filename=intro
let y;
let tmpCompObj;
x = (1).x;
tmpCompObj = 1;
const tmpIfTest = tmpCompObj.foo;
`````

## Globals

BAD@! Found 1 implicit global bindings:

x

## Result

Should call `$` with:
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
