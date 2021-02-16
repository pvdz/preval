# Preval test case

# obj.md

> normalize > pattern > param > _base > obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
f({ x } = 1);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = f;
let tmpCalleeParam;
const tmpNestedAssignObjPatternRhs = 1;
x = tmpNestedAssignObjPatternRhs.x;
tmpCalleeParam = tmpNestedAssignObjPatternRhs;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpCallCallee = f;
x = (1).x;
tmpCallCallee(1);
`````

## Globals

BAD@! Found 2 implicit global bindings:

f, x

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Normalized calls: Same

Final output calls: Same
