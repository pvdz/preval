# Preval test case

# nested_assign.md

> Normalize > Member access > Assign rhs > Nested assign
>
> Assignment to nested property should normalize just fine

## Input

`````js filename=intro
const obj = {a: {b: $()}};
let x = 10;
x = obj.a.b = 15;
$(x);
$(obj.a.b);
`````

## Pre Normal

`````js filename=intro
const obj = { a: { b: $() } };
let x = 10;
x = obj.a.b = 15;
$(x);
$(obj.a.b);
`````

## Normalized

`````js filename=intro
const tmpObjLitVal$1 = $();
const tmpObjLitVal = { b: tmpObjLitVal$1 };
const obj = { a: tmpObjLitVal };
let x = 10;
const tmpNestedAssignObj = obj.a;
const tmpNestedPropAssignRhs = 15;
tmpNestedAssignObj.b = tmpNestedPropAssignRhs;
x = tmpNestedPropAssignRhs;
$(x);
const tmpCallCallee = $;
const tmpCompObj = obj.a;
const tmpCalleeParam = tmpCompObj.b;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$();
$(15);
$(15);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 
 - 2: 15
 - 3: 15
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
