# Preval test case

# auto_ident_array_complex.md

> Normalize > Expressions > Statement > Binary right > Auto ident array complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(100) + [$(1), 2, $(3)];
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$(100) + [$(1), 2, $(3)];
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = $(100);
const tmpArrElement = $(1);
const tmpArrElement$1 = 2;
const tmpArrElement$3 = $(3);
const tmpBinBothRhs = [tmpArrElement, tmpArrElement$1, tmpArrElement$3];
tmpBinBothLhs + tmpBinBothRhs;
$(a);
`````

## Output


`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpBinBothLhs = $(100);
const tmpArrElement = $(1);
const tmpArrElement$3 = $(3);
const tmpBinBothRhs = [tmpArrElement, 2, tmpArrElement$3];
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
const b = $( 100 );
const c = $( 1 );
const d = $( 3 );
const e = [ c, 2, d ];
b + e;
$( a );
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
