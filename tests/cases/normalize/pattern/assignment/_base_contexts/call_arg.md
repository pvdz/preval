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
'<skipped>';
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
