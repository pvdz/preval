# Preval test case

# global_nested.md

> normalize > member_access > global_nested
>
> Assignment to nested property should normalize just fine

## Input

`````js filename=intro
const obj = {a: {b: $()}};
$(obj.a.b = 15);
$(obj.a.b);
`````

## Normalized

`````js filename=intro
const tmpObjLitVal$1 = $();
const tmpObjLitVal = { b: tmpObjLitVal$1 };
const obj = { a: tmpObjLitVal };
const tmpCallCallee = $;
let tmpCalleeParam;
const tmpNestedAssignObj = obj.a;
const tmpNestedPropAssignRhs = 15;
tmpNestedAssignObj.b = tmpNestedPropAssignRhs;
tmpCalleeParam = tmpNestedPropAssignRhs;
tmpCallCallee(tmpCalleeParam);
const tmpCallCallee$1 = $;
const tmpCompObj = obj.a;
const tmpCalleeParam$1 = tmpCompObj.b;
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 
 - 2: 15
 - 3: 15
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
