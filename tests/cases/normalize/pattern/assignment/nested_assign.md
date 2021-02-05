# Preval test case

# obj.md

> normalize > pattern > param > _base > obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
let y;
y = { x } = { x: 1 };
$(y);
`````

## Normalized

`````js filename=intro
let y;
const tmpNestedAssignObjPatternRhs = { x: 1 };
x = tmpNestedAssignObjPatternRhs.x;
y = tmpNestedAssignObjPatternRhs;
$(y);
`````

## Output

`````js filename=intro
let y;
const tmpNestedAssignObjPatternRhs = { x: 1 };
x = tmpNestedAssignObjPatternRhs.x;
y = tmpNestedAssignObjPatternRhs;
$(y);
`````

## Result

Should call `$` with:
 - 1: { x: '1' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
