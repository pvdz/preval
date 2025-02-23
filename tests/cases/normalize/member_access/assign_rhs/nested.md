# Preval test case

# nested.md

> Normalize > Member access > Assign rhs > Nested
>
> Ident property access should not be changed

## Input

`````js filename=intro
const obj = {a: {b: $()}};
let x = 10;
x = obj.a.b;
$(x);
`````

## Pre Normal


`````js filename=intro
const obj = { a: { b: $() } };
let x = 10;
x = obj.a.b;
$(x);
`````

## Normalized


`````js filename=intro
const tmpObjLitVal$1 = $();
const tmpObjLitVal = { b: tmpObjLitVal$1 };
const obj = { a: tmpObjLitVal };
let x = 10;
const tmpAssignRhsProp = obj.a;
x = tmpAssignRhsProp.b;
$(x);
`````

## Output


`````js filename=intro
const tmpObjLitVal$1 /*:unknown*/ = $();
$(tmpObjLitVal$1);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $();
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
