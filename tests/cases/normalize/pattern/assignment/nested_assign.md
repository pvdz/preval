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
const tmpNestedAssignObjPatternRhs = { x: 1 };
x = tmpNestedAssignObjPatternRhs.x;
$(tmpNestedAssignObjPatternRhs);
`````

## Globals

BAD@! Found 1 implicit global bindings:

x

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Normalized calls: Same

Final output calls: Same
