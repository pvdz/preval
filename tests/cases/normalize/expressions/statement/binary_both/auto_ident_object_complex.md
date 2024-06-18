# Preval test case

# auto_ident_object_complex.md

> Normalize > Expressions > Statement > Binary both > Auto ident object complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
({ x: $(1), y: 2, z: $(3) } + { x: $(1), y: 2, z: $(3) });
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
({ x: $(1), y: 2, z: $(3) } + { x: $(1), y: 2, z: $(3) });
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpObjLitVal = $(1);
const tmpObjLitVal$1 = 2;
const tmpObjLitVal$3 = $(3);
const tmpBinBothLhs = { x: tmpObjLitVal, y: tmpObjLitVal$1, z: tmpObjLitVal$3 };
const tmpObjLitVal$5 = $(1);
const tmpObjLitVal$7 = 2;
const tmpObjLitVal$9 = $(3);
const tmpBinBothRhs = { x: tmpObjLitVal$5, y: tmpObjLitVal$7, z: tmpObjLitVal$9 };
tmpBinBothLhs + tmpBinBothRhs;
$(a);
`````

## Output


`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpObjLitVal = $(1);
const tmpObjLitVal$3 = $(3);
const tmpBinBothLhs = { x: tmpObjLitVal, y: 2, z: tmpObjLitVal$3 };
const tmpObjLitVal$5 = $(1);
const tmpObjLitVal$9 = $(3);
const tmpBinBothRhs = { x: tmpObjLitVal$5, y: 2, z: tmpObjLitVal$9 };
tmpBinBothLhs + tmpBinBothRhs;
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
const e = $( 1 );
const f = $( 3 );
const g = {
  x: e,
  y: 2,
  z: f,
};
d + g;
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 3
 - 3: 1
 - 4: 3
 - 5: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
