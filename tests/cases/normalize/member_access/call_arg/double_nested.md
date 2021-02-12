# Preval test case

# global_double_nested.md

> normalize > member_access > global_double_nested
>
> Ident property access should not be changed

## Input

`````js filename=intro
const obj = {a: {b: {c: $()}}};
$(obj.a.b.c);
`````

## Normalized

`````js filename=intro
const tmpObjLitVal$2 = $();
const tmpObjLitVal$1 = { c: tmpObjLitVal$2 };
const tmpObjLitVal = { b: tmpObjLitVal$1 };
const obj = { a: tmpObjLitVal };
const tmpCallCallee = $;
const tmpCompObj$1 = obj.a;
const tmpCompObj = tmpCompObj$1.b;
const tmpCalleeParam = tmpCompObj.c;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpObjLitVal$2 = $();
const tmpObjLitVal$1 = { c: tmpObjLitVal$2 };
const tmpObjLitVal = { b: tmpObjLitVal$1 };
const obj = { a: tmpObjLitVal };
const tmpCompObj$1 = obj.a;
const tmpCompObj = tmpCompObj$1.b;
const tmpCalleeParam = tmpCompObj.c;
$(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: 
 - 2: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
