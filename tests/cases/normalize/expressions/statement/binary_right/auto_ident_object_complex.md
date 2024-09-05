# Preval test case

# auto_ident_object_complex.md

> Normalize > Expressions > Statement > Binary right > Auto ident object complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(100) + { x: $(1), y: 2, z: $(3) };
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$(100) + { x: $(1), y: 2, z: $(3) };
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = $(100);
const tmpObjLitVal = $(1);
const tmpObjLitVal$1 = 2;
const tmpObjLitVal$3 = $(3);
const tmpBinBothRhs = { x: tmpObjLitVal, y: tmpObjLitVal$1, z: tmpObjLitVal$3 };
tmpBinBothLhs + tmpBinBothRhs;
$(a);
`````

## Output


`````js filename=intro
const tmpBinBothLhs = $(100);
const tmpObjLitVal = $(1);
const tmpObjLitVal$3 = $(3);
const tmpBinBothRhs = { x: tmpObjLitVal, y: 2, z: tmpObjLitVal$3 };
tmpBinBothLhs + tmpBinBothRhs;
const a = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 100 );
const b = $( 1 );
const c = $( 3 );
const d = {
  x: b,
  y: 2,
  z: c,
};
a + d;
const e = {
  a: 999,
  b: 1000,
};
$( e );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 1
 - 3: 3
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
