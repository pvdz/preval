# Preval test case

# auto_ident_bin.md

> Normalize > Expressions > Statement > Binary both > Auto ident bin
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(1) + $(2) + ($(1) + $(2));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$(1) + $(2) + ($(1) + $(2));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpBinBothLhs$1 = $(1);
const tmpBinBothRhs$1 = $(2);
const tmpBinBothLhs = tmpBinBothLhs$1 + tmpBinBothRhs$1;
const tmpBinBothLhs$3 = $(1);
const tmpBinBothRhs$3 = $(2);
const tmpBinBothRhs = tmpBinBothLhs$3 + tmpBinBothRhs$3;
tmpBinBothLhs + tmpBinBothRhs;
$(a);
`````

## Output


`````js filename=intro
const tmpBinBothLhs$1 = $(1);
const tmpBinBothRhs$1 = $(2);
const tmpBinBothLhs = tmpBinBothLhs$1 + tmpBinBothRhs$1;
const tmpBinBothLhs$3 = $(1);
const tmpBinBothRhs$3 = $(2);
const tmpBinBothRhs = tmpBinBothLhs$3 + tmpBinBothRhs$3;
tmpBinBothLhs + tmpBinBothRhs;
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 2 );
const c = a + b;
const d = $( 1 );
const e = $( 2 );
const f = d + e;
c + f;
const g = {
  a: 999,
  b: 1000,
};
$( g );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1
 - 4: 2
 - 5: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
