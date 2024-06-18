# Preval test case

# auto_ident_object_complex.md

> Normalize > Expressions > Statement > Objlit spread > Auto ident object complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
({ ...{ x: $(1), y: 2, z: $(3) } });
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
({ ...{ x: $(1), y: 2, z: $(3) } });
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpObjLitVal = $(1);
const tmpObjLitVal$1 = 2;
const tmpObjLitVal$3 = $(3);
const tmpObjSpreadArg = { x: tmpObjLitVal, y: tmpObjLitVal$1, z: tmpObjLitVal$3 };
({ ...tmpObjSpreadArg });
$(a);
`````

## Output


`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpObjLitVal = $(1);
const tmpObjLitVal$3 = $(3);
const tmpObjSpreadArg = { x: tmpObjLitVal, y: 2, z: tmpObjLitVal$3 };
({ ...tmpObjSpreadArg });
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
  a: 999,
  b: 1000,
};
const b = $( 1 );
const c = $( 3 );
const d = {
  x: b,
  y: 2,
  z: c,
};
{ ... d };
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 3
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
