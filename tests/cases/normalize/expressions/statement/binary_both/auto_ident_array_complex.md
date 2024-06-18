# Preval test case

# auto_ident_array_complex.md

> Normalize > Expressions > Statement > Binary both > Auto ident array complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
[$(1), 2, $(3)] + [$(1), 2, $(3)];
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
[$(1), 2, $(3)] + [$(1), 2, $(3)];
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpArrElement = $(1);
const tmpArrElement$1 = 2;
const tmpArrElement$3 = $(3);
const tmpBinBothLhs = [tmpArrElement, tmpArrElement$1, tmpArrElement$3];
const tmpArrElement$5 = $(1);
const tmpArrElement$7 = 2;
const tmpArrElement$9 = $(3);
const tmpBinBothRhs = [tmpArrElement$5, tmpArrElement$7, tmpArrElement$9];
tmpBinBothLhs + tmpBinBothRhs;
$(a);
`````

## Output


`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpArrElement = $(1);
const tmpArrElement$3 = $(3);
const tmpBinBothLhs = [tmpArrElement, 2, tmpArrElement$3];
const tmpArrElement$5 = $(1);
const tmpArrElement$9 = $(3);
const tmpBinBothRhs = [tmpArrElement$5, 2, tmpArrElement$9];
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
const d = [ b, 2, c ];
const e = $( 1 );
const f = $( 3 );
const g = [ e, 2, f ];
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
