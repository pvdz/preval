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
const varInitAssignLhsComputedObj = obj.a;
const varInitAssignLhsComputedRhs = 15;
varInitAssignLhsComputedObj.b = varInitAssignLhsComputedRhs;
const tmpCalleeParam = varInitAssignLhsComputedRhs;
tmpCallCallee(tmpCalleeParam);
const tmpCallCallee$1 = $;
const tmpCompObj = obj.a;
const tmpCalleeParam$1 = tmpCompObj.b;
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output

`````js filename=intro
const tmpObjLitVal$1 = $();
const tmpObjLitVal = { b: tmpObjLitVal$1 };
const obj = { a: tmpObjLitVal };
const varInitAssignLhsComputedObj = obj.a;
varInitAssignLhsComputedObj.b = 15;
$(15);
const tmpCompObj = obj.a;
const tmpCalleeParam$1 = tmpCompObj.b;
$(tmpCalleeParam$1);
`````

## Result

Should call `$` with:
 - 1: 
 - 2: 15
 - 3: 15
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
