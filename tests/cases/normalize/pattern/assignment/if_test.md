# Preval test case

# obj.md

> normalize > pattern > param > _base > obj
>
> Testing simple pattern normalizations

## Input

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
let tmpIfTest;
x = (1).x;
tmpIfTest = 1;
`````

## Result

Should call `$` with:
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
