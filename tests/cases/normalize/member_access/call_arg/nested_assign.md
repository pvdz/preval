# Preval test case

# nested_assign.md

> Normalize > Member access > Call arg > Nested assign
>
> Assignment to nested property should normalize just fine

## Input

`````js filename=intro
const obj = {a: {b: $()}};
$(obj.a.b = 15);
$(obj.a.b);
`````

## Pre Normal


`````js filename=intro
const obj = { a: { b: $() } };
$((obj.a.b = 15));
$(obj.a.b);
`````

## Normalized


`````js filename=intro
const tmpObjLitVal$1 = $();
const tmpObjLitVal = { b: tmpObjLitVal$1 };
const obj = { a: tmpObjLitVal };
const varInitAssignLhsComputedObj = obj.a;
const varInitAssignLhsComputedRhs = 15;
varInitAssignLhsComputedObj.b = varInitAssignLhsComputedRhs;
const tmpCalleeParam = varInitAssignLhsComputedRhs;
$(tmpCalleeParam);
const tmpCompObj = obj.a;
const tmpCalleeParam$1 = tmpCompObj.b;
$(tmpCalleeParam$1);
`````

## Output


`````js filename=intro
$();
$(15);
$(15);
`````

## PST Output

With rename=true

`````js filename=intro
$();
$( 15 );
$( 15 );
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
